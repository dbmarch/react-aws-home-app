# For the S3 bucket holding our deployable code,

Changed the way the S3 bucket provides read access.

Using only the bucket policy.  
Remove setting ACL on file sync
Remove the ACL in permissions.
Public access setting has True except for the last checkbox 9blcok public and cross account access...)
