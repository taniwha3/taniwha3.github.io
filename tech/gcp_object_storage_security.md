# Object Storage Setup and Security for Multi-Tenant GCP Environments

> Created on: 2025-02-27 | Last Updated: 2025-02-27

## 1. Creating Object Storage (Per-Tenant Buckets and Namespaces)

### Bucket per Customer
Organize your multi-tenant data by creating a separate Cloud Storage bucket for each customer. This provides strong isolation, as each bucket serves as a dedicated namespace for that customer's objects. Buckets in GCP have unique global names and can hold virtually unlimited objects (millions or more) without performance issues. For example, you might create buckets like `customerA-data`, `customerB-data`, etc., to segregate data.

### Dedicated Namespace
With one bucket per tenant, each customer's object names are independent. This means Customer A's files won't collide with Customer B's, and access policies can be applied per bucket. Treat each bucket as the customer's namespace for object storage, simplifying management and cleanup. Ensure that bucket naming follows GCP guidelines (unique name, lowercase, etc.) and possibly include the customer identifier for clarity.

### Configuration Steps:
1. **Create the Bucket**: Use the Cloud Console or CLI (`gsutil mb`) to create a new bucket for the customer. Specify an appropriate storage class and region based on requirements.
2. **Enable Uniform Bucket-Level Access**: Turn on Uniform bucket-level access for each bucket to enforce that all object permissions are managed solely through IAM (and not individual ACLs). This simplifies administration and prevents overly permissive ACLs.
3. **Apply Naming Conventions**: Define a naming convention for objects or subfolders within the bucket if needed (e.g. `/training/` vs `/production/` data) to further organize data per customer. This will help with identification and lifecycle management.

Each bucket being isolated not only eases management but also improves security by containing any potential issues or misconfigurations to a single tenant's data. Keep the number of buckets reasonable – having dozens is fine, but thousands might increase operational overhead (though GCP can handle many buckets, it's about your manageability). In this scenario with three major customers, separate buckets is a straightforward and scalable approach.

## 2. Identifying Training Objects within the Primary Dataset

When a bucket contains a mix of training data and other data, you need a reliable way to flag or separate the training objects. There are a few approaches, each with pros and cons:

### Object Metadata Tags
You can attach custom metadata (key–value pairs) to each object to label it as training data (e.g., metadata: `{"dataset":"training"}`). This is flexible, as the tag lives with the object. However, Cloud Storage does not support querying or listing by metadata out-of-the-box. Identifying all training objects via metadata would require scanning all objects or maintaining an external index, which is not efficient at 7M+ scale. GCS lacks a built-in index or search by metadata, so relying solely on metadata means you'd need an external database or BigQuery table listing objects and their tags to find the training set.

### Prefix Naming (Folder Structure)
A common, scalable practice is to use naming conventions or prefixes to segregate training data. For example, store training files under a designated "folder" path like `gs://<bucket>/training/...` and other data under `gs://<bucket>/non-training/...`. Cloud Storage treats object names as a flat namespace, but the API and tools allow listing by prefix (simulating folders). This means you can quickly list all `training/` objects without scanning the entire bucket. Prefix filtering is very efficient and is a standard way to organize large numbers of objects. Given GCS buckets can handle millions of objects, using a prefix for the training subset is scalable – you might have, say, 7 million objects under `training/` across the customers, which GCS can handle in a single bucket. Designing a hierarchical key structure (e.g., `customerA/training/2023/data1.csv`) also helps with partial retrieves and lifecycle rules.

### Separate Buckets or External Index (Other Methods)
Another method is to isolate training data in a separate bucket or use an external indexing system. For example, you could create a bucket specifically for training datasets per customer (e.g., `customerA-training-data`) apart from the primary dataset bucket. This makes identification trivial (everything in that bucket is training data) at the cost of more buckets to manage. Alternatively, maintain a catalog of object names in a database or BigQuery (especially if complex filtering is needed beyond simple prefix matching). This external index approach can handle advanced queries on metadata or attributes, but it introduces additional overhead in keeping the index updated and consistent with the bucket.

### Recommendation
For 7M+ objects per customer, using a prefix naming scheme is the most scalable and straightforward approach. It leverages Cloud Storage's native listing capabilities and avoids the need for scanning every object's metadata. For example, consistently prefix all training data with `training/` (or another identifiable prefix). This way, a process can list `gs://bucket/customerA/training/` to retrieve all training files for Customer A. Metadata tags alone are not easily queryable at scale, and maintaining an external index for tens of millions of objects could become complex. If additional querying capabilities are needed (e.g., to filter by metadata like tags), consider using BigQuery's Cloud Storage Object Tables or a separate index – but start with prefix-based organization as it will cover most needs in a simple, performant way. In summary, prefix-based categorization offers an efficient, built-in solution for segregating training data in a huge dataset, whereas metadata tagging would require significant extra infrastructure to be feasible at this scale.

## 3. Securing Access with IAM

Controlling access in a multi-tenant storage environment is critical. Identity and Access Management (IAM) allows you to enforce fine-grained permissions on buckets and objects. Follow these best practices:

### Least Privilege IAM Roles
Grant the minimum necessary permissions to each user or service. Rather than making someone a Project Editor/Owner (which would grant broad access), use predefined Storage roles like Storage Object Viewer, Storage Object Creator, or Storage Admin as appropriate. For instance, a data scientist who only needs to read training data could be given the Storage Object Viewer role on the specific bucket (or even a specific prefix if using IAM Conditions), instead of full control. Avoid overly permissive roles; this ensures each customer or internal team can only access their own bucket/data. Google's best practice is to always apply the principle of least privilege when granting access.

### Bucket-Level IAM vs Object ACLs
Prefer bucket-level IAM policies over object ACLs for simplicity and consistency. Enabling Uniform bucket-level access (as noted above) will enforce that all object access is governed by IAM. This means you can manage all permissions in one place (the bucket policy) rather than per-file ACLs. IAM is also required for certain advanced security features (like VPC Service Controls) to work properly. Only use object ACLs if you have a very specific need for per-object public access or fine-tuning (which is rare in enterprise setups). In a multi-tenant setup, it's easiest to keep things uniform: each customer's bucket has an IAM policy granting that customer's identities access and no one else.

### Restrict Access to Specific Users/Processes
Use separate service accounts for automated processes (like ETL jobs or AI pipelines) and grant those service accounts access only to the buckets or objects they need. For example, if you have a training pipeline that needs to read Customer A's training images, create a service account for that pipeline and give it read access on `customerA-data` bucket (or just the `training/` prefix via IAM Conditions). Do not use personal user accounts for automation – service accounts are preferred since they can be tightly scoped and easily revoked without affecting a real user. Additionally, group human users by role or customer: if Customer A has a team of analysts, put their Google identities in a Google Group and grant that group Storage Object Viewer/Editor on Customer A's bucket only. This way, on-boarding or off-boarding users is as simple as updating group membership.

### On-Prem Third-Party Operator Access
For third-parties or external operators that need access to the bucket, avoid sharing broad credentials. Instead, consider using signed URLs or signed access tokens for time-limited access to specific objects. For example, if an on-prem operator needs to fetch a specific file, you can generate a signed URL that grants read access for a short duration (say 15 minutes) to that object, without exposing any permanent credentials. If the third-party requires ongoing programmatic access (e.g., a vendor service pulling data regularly), create a dedicated service account for them and share only that service account's key or use Workload Identity Federation if they support it. Workload Identity Federation allows an external identity (like an on-prem service's IAM or OIDC identity) to impersonate a Google service account without using a static key, which is more secure (no key to leak). If you must provide a service account key to the third-party, restrict its IAM role to only the needed bucket and operations (e.g., read-only on training data), and set up a process to rotate that key periodically. Monitor and log all access (Cloud Audit Logs for Cloud Storage) so you have an audit trail of exactly who accessed what.

### Monitoring and Auditing
Ensure that Cloud Storage Access Logs and Data Access audit logs are enabled for your buckets. This will record actions like object reads/writes and IAM changes. Regularly review these logs to detect any unexpected access, especially for third-party accounts. Also consider setting up alerts (using Cloud Monitoring or Security Command Center) for unusual access patterns, like a user accessing an unusually high number of objects or attempts to access unauthorized buckets.

By following IAM best practices, each customer will only have access to their own bucket, internal teams will only access what they should, and any external operators will be tightly limited. The combination of IAM policies at the bucket level and least-privilege role assignments helps maintain a secure separation between tenants.

## 4. Secure Connectivity for Off-GCP AI Pipeline

If your AI pipeline runs outside of GCP (for example, on an external platform or an on-prem cluster), you need to securely connect that environment to Google Cloud Storage to retrieve data. There are several measures to ensure the connection is private and secure:

### Private Network Connectivity (VPN/Interconnect)
Establish a secure VPN connection or a dedicated interconnect between the external environment and your GCP Virtual Private Cloud. Cloud VPN (IPsec) can extend an on-prem network into GCP over an encrypted tunnel. This way, when the external AI pipeline needs to pull data from Cloud Storage, it can route through the VPN into GCP, instead of going over the public internet. Similarly, a Cloud Interconnect (or Partner Interconnect) provides a private, high-bandwidth link if the data volumes are large. Using VPN/Interconnect ensures that data in transit is encrypted and travels via a trusted path. On-premises hosts can reach Google APIs and services by using Cloud VPN or Cloud Interconnect from your on-premises network to Google Cloud, meaning your external pipeline can fetch GCS objects as if it were within a secure network extension. Be sure to also enable Private Google Access for on-premises hosts so that your on-prem systems can reach Google APIs (like Cloud Storage endpoints) via internal IP addresses and the VPN, rather than requiring public IP access (this involves routing the special Google API IP ranges through your VPN).

### VPC Service Controls
Implement VPC Service Controls (VPC-SC) around your Cloud Storage buckets for an additional layer of security. VPC-SC allows you to create a security perimeter that blocks data access to Google Cloud services (like Cloud Storage) from outside of your trusted network or project. In a basic configuration, a service perimeter will "block access to every connection coming from the outside world" for protected services like Cloud Storage. This means even if someone had valid credentials, if they're not accessing from your allowed environment (e.g., your VPN or GCP project), their requests to Cloud Storage will be denied. You can use Access Levels (part of Access Context Manager) to allow specific external IP ranges or identities if needed, but by default VPC-SC ensures no data leaks out to unauthorized networks. In practice, you would put the project containing your storage buckets into a VPC-SC perimeter. If your external environment connects via VPN with an IP range you control, you could configure an access level to permit that range while still blocking any other external source. Note: VPC-SC works in tandem with IAM (it doesn't replace it), so both the network and identity must be authorized for access. This defense-in-depth is very powerful for preventing accidental data exfiltration or access using stolen credentials.

### Secure Access to Cloud Storage APIs
Whether or not you use VPC-SC, always ensure that your data is accessed via encrypted channels. The Cloud Storage JSON/XML APIs are HTTPS by default, so any data fetched from GCS will be encrypted in transit. Do not use gs:// URLs without encryption (in practice, GCS does not support unencrypted HTTP for API calls). If your external environment supports it, use Private Service Connect or Private Google Access endpoints – this lets you resolve Cloud Storage API calls to a private IP through the VPN, keeping traffic off the public internet entirely. Also, consider service account impersonation or short-lived credentials for the pipeline to access GCS, rather than embedding long-term keys in the pipeline. This ties into IAM best practices but has connectivity implications: for example, using OAuth tokens or workload identity will ensure each connection is authenticated and can be revoked quickly if needed.

### Data Transfer Best Practices
If the AI pipeline will pull large volumes of data regularly, you want to optimize the transfer. In addition to the secure channel, you might enable Parallel composite uploads/downloads or use gsutil -m (multithreaded transfers) to speed up transfers over VPN. Monitor the network throughput and use Cloud Monitoring to track egress usage. If using a partner that runs on another cloud, see if they support a direct peering or cloud-to-cloud private link to GCP. The goal is to minimize exposure on the open internet and use trusted links as much as possible.

In summary, set up a VPN or Interconnect to create a private, encrypted link for your off-GCP pipeline, and consider VPC Service Controls to cordon off your storage from any unwanted access. These measures ensure that even though your training pipeline runs outside GCP, it accesses the data in a manner that is as secure as if it were within GCP.

## 5. Customer-Managed Encryption Keys (CMEK) Implementation

By default, Google Cloud Storage encrypts all data at rest using Google-managed encryption keys. This means that as soon as you upload an object, Google automatically encrypts it using keys that Google owns and manages (including regular key rotation), with no action needed on your part. For most cases, this default encryption (often called Google-managed keys or GMEK) is sufficient and meets security requirements, since Google's processes for managing these keys are robust. The data is transparently decrypted when you read it, again with no special steps.

However, if a customer requires control over encryption keys – for compliance or internal policy reasons – you can implement Customer-Managed Encryption Keys (CMEK) using Cloud KMS. With CMEK, you supply a Cloud KMS key that Cloud Storage will use to encrypt/decrypt the objects in the bucket, instead of the Google-managed key. This gives the customer direct control over key rotation, access, and lifecycle. Using Cloud KMS keys gives you control over their protection level, location, rotation schedule, usage and access permissions, and cryptographic boundaries, which can help meet stringent regulatory requirements.

### CMEK Setup Steps:

1. **Create a KMS Key**: In Cloud KMS, create a Key Ring and a CryptoKey for the customer's data. Choose a location for the key that matches (or is near) the bucket's location for performance and compliance. For example, create a key ring in us-central1 and then a key (e.g., customerA-key) within that ring. You can use either the Cloud Console or gcloud CLI (`gcloud kms keys create ...`) for this.

2. **Authorize the Cloud Storage Service Account**: This step is crucial – when using CMEK, you must grant Cloud Storage permission to use the Cloud KMS key to encrypt and decrypt objects. Behind the scenes, Cloud Storage uses a service agent (a Google-managed service account specific to your project) for KMS operations. You need to give that service account the Cloud KMS CryptoKey Encrypter/Decrypter role on the KMS key. An easy way to do this is with the gsutil command:

   ```bash
   gsutil kms serviceaccount -p <PROJECT_ID>
   ```

   This outputs the email identity of the GCS service agent for your project (it looks like `service-<project-number>@gs-project-accounts.iam.gserviceaccount.com`). Then grant that identity access to the KMS key, for example:

   ```bash
   gcloud kms keys add-iam-policy-binding projects/<proj>/locations/<loc>/keyRings/<ring>/cryptoKeys/<key> \
       --member serviceAccount:service-<proj-num>@gs-project-accounts.iam.gserviceaccount.com \
       --role roles/cloudkms.cryptoKeyEncrypterDecrypter
   ```

   This authorization ensures Cloud Storage can encrypt new objects with the key and decrypt them when accessed. If this is not done, you'll encounter errors (HTTP 403) when attempting to use the key, as Cloud Storage will be "forbidden" from using it.

3. **Set the Bucket's Default Encryption Key**: Once the key is ready and permissions are in place, configure the Cloud Storage bucket to use this key by default. In the Cloud Console, this is under Bucket > Properties > Default Encryption, where you can select the customer-managed key. With gsutil, you can run:

   ```bash
   gsutil bucket kms authorize -k <key> gs://<bucket> 
   ```

   (which under the hood does the service account authorization), and then

   ```bash
   gsutil bucket kms default -k <key> gs://<bucket>
   ```

   (exact commands may differ slightly as Google updates tools). After this, any new object uploaded to that bucket will be encrypted with the CMEK by default. You don't have to specify the key for each upload – the bucket's default handles it. You can also enforce that all writes must provide the CMEK by using bucket policy only if required.

4. **Migrating Existing Objects (if needed)**: Enabling a default CMEK on a bucket does not retroactively re-encrypt existing objects. Data already in the bucket stays encrypted with the key it was originally encrypted with (likely the Google-managed key, if they were uploaded before CMEK was set). If the customer requires all existing data to now use the CMEK, you'll have to rewrite or copy those objects so that they get re-encrypted with the new key. This can be done using a simple copy command within the bucket (which will read and write the object back, applying the new key). Plan this carefully if dealing with millions of objects – it might be an automated batch job or use the Storage Transfer Service.

### Managing CMEK Lifecycle and Permissions

Using CMEK introduces ongoing management tasks for the encryption key itself:

#### Rotation
Decide if you will rotate the key regularly (for example, create a new key version every 90 days). Cloud KMS can automate key rotation schedules. Rotation doesn't require any change on the bucket side as long as the key resource is the same; new versions will be used for new encryptions. Ensure older key versions are kept enabled if they are still needed to decrypt older objects.

#### Key Access Permissions
Limit who in your organization can use or manage the CMEK key. Only security admins might have rights to rotate or disable the key. By controlling Cloud KMS IAM, you maintain separation of duties – e.g., storage admins can manage buckets but only security team can manage the keys.

#### Disabling/Deleting Keys
Be very careful with the CMEK's status. If a CMEK is disabled, Cloud Storage will refuse access to any objects encrypted with that key until it's re-enabled (because decryption is not allowed). If a CMEK is scheduled for destruction or deleted, any data encrypted with it becomes permanently unreadable after that point. Always have policies in place to prevent accidental key deletion. Typically, you might want to label keys or put them in a separate key ring for each customer to avoid mix-ups. Also enable Cloud KMS recovery options if available, and require multiple approvals for key destruction.

#### Auditing
Cloud KMS provides audit logs for key usage. Monitor these to see whenever the key is used to encrypt or decrypt (which will correspond to object upload/download in this bucket). This can help detect any unusual activity on the encryption layer.

#### Fallback to Google-Managed Keys
In case a customer no longer requires a CMEK or there's an issue, you can always reconfigure the bucket to stop using the CMEK (and revert to Google-managed encryption for new objects). Data already encrypted with CMEK will remain so; you'd again have to rewrite it if you wanted it under Google-managed keys.

In practice, many customers accept the default Google-managed encryption, since it is robust and saves the operational overhead. But if CMEK is mandated, the above steps ensure you implement it correctly and maintain it. Remember that CMEK gives the customer more control, but also more responsibility – the key must be kept safe and managed actively. It's often wise to document the process for key rotation and have an agreed runbook with the customer for key management events (rotations, potential key disable, etc.). This way, your object storage remains not only secure from an access standpoint, but also complies with the customer's encryption requirements, with keys that they effectively control.