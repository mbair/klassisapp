#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.klassis.klassisapp2019/host.exp.exponent.MainActivity
