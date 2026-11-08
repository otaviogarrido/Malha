@echo off
chcp 65001 >nul
title Malha - Atualizar no GitHub e Cloudflare
color 0b
echo ===================================================
echo     MALHA TECNOLOGIA - ATUALIZAR GITHUB & SITE
echo ===================================================
echo.
echo Salvando alteracoes no codigo...
git add .
git commit -m "fix(mobile): remover nowrap do titulo hero, ajustar grid de solucoes e conter overflow no Android"
echo.
echo Enviando para o GitHub...
git push origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo     SUCESSO! O PROJETO FOI ATUALIZADO NO GITHUB!
    echo     A Cloudflare vai atualizar seu site em instantes.
    echo ===================================================
) else (
    echo.
    echo Ocorreu um problema ao enviar.
)
echo.
pause
