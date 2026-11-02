Add-Type -AssemblyName System.Drawing

$srcPath = "C:/Users/user/.gemini/antigravity/brain/026c39b9-5fec-4adf-8902-4838e73fd438/.user_uploaded/media_1793613654392_c7729921.jpg"
$destPath = "D:/UTS FEBRIAN/assets/profile.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Original dimensions: $($src.Width) x $($src.Height)"

# Find black borders: scan from top to find where red background starts
$top = 0
for ($y = 0; $y -lt $src.Height / 2; $y++) {
    $pixel = $src.GetPixel([int]($src.Width / 2), $y)
    # Check if not pure black (R > 50 or G > 50 or B > 50)
    if ($pixel.R -gt 50 -or $pixel.G -gt 50 -or $pixel.B -gt 50) {
        $top = $y
        break
    }
}

# Scan from bottom
$bottom = $src.Height - 1
for ($y = $src.Height - 1; $y -gt $src.Height / 2; $y--) {
    $pixel = $src.GetPixel([int]($src.Width / 2), $y)
    if ($pixel.R -gt 50 -or $pixel.G -gt 50 -or $pixel.B -gt 50) {
        $bottom = $y
        break
    }
}

Write-Host "Content bounds Y: $top to $bottom (Height: $($bottom - $top))"

# Crop the content between $top and $bottom
$contentHeight = $bottom - $top
$contentWidth = $src.Width

# Let's crop into a nice 1:1 square centered on the head and chest
# The head is in the upper part of the photo
# Let's find a square region: width = contentWidth, height = contentWidth
$cropY = $top
if ($contentHeight -gt $contentWidth) {
    # Head and shoulders are usually from top down to about contentWidth
    $cropY = [Math]::Max(0, [int]($top + ($contentHeight - $contentWidth) * 0.15))
    if ($cropY + $contentWidth -gt $bottom) {
        $cropY = $bottom - $contentWidth
    }
}

$cropRect = New-Object System.Drawing.Rectangle(0, $cropY, $contentWidth, $contentWidth)
Write-Host "Cropping square region: x=0, y=$cropY, size=$contentWidth"

$croppedBmp = New-Object System.Drawing.Bitmap($contentWidth, $contentWidth)
$graphics = [System.Drawing.Graphics]::FromImage($croppedBmp)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$destRect = New-Object System.Drawing.Rectangle(0, 0, $contentWidth, $contentWidth)
$graphics.DrawImage($src, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

$croppedBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$croppedBmp.Dispose()
$src.Dispose()

Write-Host "Successfully cropped and saved profile avatar to $destPath"
