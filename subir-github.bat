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
git commit -m "fix(header-mobile): alinhar barra superior em grid de 2 linhas sem sobreposicao de botoes"
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
