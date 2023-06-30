# compress dist contents to zip and force write if ./zipped.zip already exists
Compress-Archive -Force -Path .\index.html, .\sdk.html, .\styles.css, .\reset.css, .\assets, .\js -DestinationPath .\package.zip
# prints file size in KB
Write-Host((Get-Item .\package.zip).length / 1KB)