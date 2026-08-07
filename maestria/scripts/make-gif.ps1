Add-Type -AssemblyName System.Drawing
$d = "$env:TEMP\maestria-frames"
$files = Get-ChildItem $d -Filter "*.jpg" | Sort-Object Name
$out = "$env:TEMP\maestria-demo.gif"
$w = 960; $h = 540; $delay = 8

# Load all frames as bitmaps
$bitmaps = @()
foreach($f in $files){
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $bmp = New-Object System.Drawing.Bitmap($w,$h)
  $gr = [System.Drawing.Graphics]::FromImage($bmp)
  $gr.DrawImage($img,0,0,$w,$h)
  $gr.Dispose()
  $img.Dispose()
  $bitmaps += $bmp
}
Write-Host "Loaded $($bitmaps.Count) frames"

# Animated GIF via Image.Save + SaveAdd
$first = $bitmaps[0]

# Set frame delay (in 1/100th seconds)
$delayItem = New-Object System.Drawing.Imaging.PropertyItem
$delayBytes = [System.BitConverter]::GetBytes([uint32]($delay * 10))
$delayItem.Id = 0x5100
$delayItem.Type = 4
$delayItem.Value = $delayBytes
$first.SetPropertyItem($delayItem)

# Loop count (0 = infinite)
$loopItem = New-Object System.Drawing.Imaging.PropertyItem
$loopBytes = [byte[]](0x00,0x00,0x00,0x00)
$loopItem.Id = 0x5101
$loopItem.Type = 1
$loopItem.Value = $loopBytes
$first.SetPropertyItem($loopItem)

# Save first frame
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq ([System.Drawing.Imaging.ImageFormat]::Gif).Guid }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::ColorDepth, [long]8)
$first.Save($out, $encoder, $params)
Write-Host "First frame saved"

# Save remaining frames
for($i=1; $i -lt $bitmaps.Count; $i++){
  $bitmaps[$i].SetPropertyItem($delayItem)
  $saveParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $saveParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::ColorDepth, [long]8)
  $bitmaps[$i].SaveAdd($saveParams)
  Write-Host -NoNewline "."
}
Write-Host ""
Write-Host "GIF SAVED: $out"
Write-Host ("SIZE: " + [math]::Round((Get-Item $out).Length/1MB,1) + "MB")

# Cleanup
foreach($b in $bitmaps){ $b.Dispose() }
