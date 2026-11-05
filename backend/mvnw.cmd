@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%" == "" @ECHO OFF
@SETLOCAL

SET ERROR_CODE=0

@REM To isolate internal variables from possible post scripts, we use another set of variables
SET "EXEC_DIR=%CD%"
SET "WDIR=%~dp0"
SET "DIRNAME=%~dp0"
IF %DIRNAME:~-1%==\ SET "DIRNAME=%DIRNAME:~0,-1%"
SET "BASE_DIR=%DIRNAME%"

@REM Find the project base dir, then use it as either default env or calculate from script
IF NOT "%MAVEN_PROJECTBASEDIR%"=="" GOTO endDetectBaseDir
SET "EXEC_DIR=%CD%"
SET "WDIR=%CD%"
:findBaseDir
IF EXIST "%WDIR%\.mvn" GOTO baseDirFound
CD ..
IF "%WDIR%"=="%CD%" GOTO baseDirNotFound
SET "WDIR=%CD%"
GOTO findBaseDir
:baseDirFound
SET "MAVEN_PROJECTBASEDIR=%WDIR%"
CD "%EXEC_DIR%"
GOTO endDetectBaseDir
:baseDirNotFound
SET "MAVEN_PROJECTBASEDIR=%BASE_DIR%"
CD "%EXEC_DIR%"
:endDetectBaseDir

IF NOT EXIST "%MAVEN_PROJECTBASEDIR%\.mvn\jvm.config" GOTO endReadAdditionalConfig
@SETLOCAL EnableExtensions EnableDelayedExpansion
FOR /F "usebackq delims=" %%a IN ("%MAVEN_PROJECTBASEDIR%\.mvn\jvm.config") DO (
    SET "JVM_CONFIG_MAVEN_PROPS=!JVM_CONFIG_MAVEN_PROPS! %%a"
)
@ENDLOCAL & SET "JVM_CONFIG_MAVEN_PROPS=%JVM_CONFIG_MAVEN_PROPS%"
:endReadAdditionalConfig

SET "MAVEN_CMD_LINE_ARGS=%JVM_CONFIG_MAVEN_PROPS% %*"

IF NOT EXIST "%BASE_DIR%\.mvn\wrapper\maven-wrapper.jar" (
    powershell -Command "&{\"%BASE_DIR%\.mvn\wrapper\MavenWrapperDownloader.ps1\"}"
)

SET WRAPPER_JAR="%BASE_DIR%\.mvn\wrapper\maven-wrapper.jar"
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

%JAVA_HOME%\bin\java %MAVEN_OPTS% -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -classpath %WRAPPER_JAR% %WRAPPER_LAUNCHER% %MAVEN_CMD_LINE_ARGS%
IF ERRORLEVEL 1 GOTO error
GOTO end

:error
SET ERROR_CODE=1

:end
@ENDLOCAL & SET ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%

