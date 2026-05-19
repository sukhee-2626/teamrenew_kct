# Save your 4 slide images to the images folder
# Place your actual images in C:\Users\HP\clu\images\ named:
#   slide1.jpg, slide2.jpg, slide3.jpg, slide4.jpg
# This script copies the generated hero background as a temporary placeholder for any missing slides

$dest = "C:\Users\HP\clu\images"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$src = "C:\Users\HP\.gemini\antigravity\brain\8fd1de21-5e33-4b58-950c-1906f54a907b\hero_bg_1779169491571.png"

# Copy hero_bg
Copy-Item $src "$dest\hero_bg.png" -Force

# Use as placeholder for any slide that doesn't exist yet
1..4 | ForEach-Object {
    $slide = "$dest\slide$_.jpg"
    if (-not (Test-Path $slide)) {
        Copy-Item $src $slide -Force
        Write-Host "Placeholder created: slide$_.jpg"
    } else {
        Write-Host "Exists (kept):       slide$_.jpg"
    }
}

Write-Host "`nDone! Replace slide1.jpg-slide4.jpg with your actual photos."
