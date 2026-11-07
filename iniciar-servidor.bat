@echo off
title Servidor Local Malha
echo ========================================================
echo   Iniciando Servidor Web Local para a Malha...
echo   Acesse: http://localhost:8080
echo   (Pressione Ctrl+C para encerrar o servidor)
echo ========================================================
start http://localhost:8080/index.html
powershell -NoProfile -Command "try { $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Write-Host 'Servidor ativo em http://localhost:8080/ - Pronto para envio de formul?rios!'; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $path = '.' + $request.Url.LocalPath.Replace('/', '\'); if ($path -eq '.\') { $path = '.\index.html'; } if (Test-Path $path -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($path); $ext = [System.IO.Path]::GetExtension($path).ToLower(); $contentType = 'application/octet-stream'; switch ($ext) { '.html' { $contentType = 'text/html; charset=utf-8' } '.css' { $contentType = 'text/css; charset=utf-8' } '.js' { $contentType = 'application/javascript; charset=utf-8' } '.json' { $contentType = 'application/json' } '.png' { $contentType = 'image/png' } '.jpg' { $contentType = 'image/jpeg' } '.svg' { $contentType = 'image/svg+xml' } } $response.ContentType = $contentType; $response.ContentLength64 = $bytes.Length; $response.OutputStream.Write($bytes, 0, $bytes.Length); } else { $response.StatusCode = 404; } $response.Close(); } } catch { Write-Host 'Erro no servidor:' $_; pause; }"
pause