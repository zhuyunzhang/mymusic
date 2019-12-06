## Getting started
```bash
我的qq号,有事请联系
qq:1204383390
```

1. Clone this repo

```bash
git clone https://github.com/zhuyunzhang/mymusic.git
```

2. Change into the directory

```bash
cd "目标目录下"
```

3 Install the dependencies

```bash
yarn
# or
npm install
```

4. Run the project 
app-debug build
```bash
react-native run-ios
# or
react-native run-android
```
5.app-release build
```bash
正式包之前修改底层库 node_modules/react-native-blur/android/build.gradle 中版本号具体配置为：
android {
    compileSdkVersion 28
    buildToolsVersion "28.0.3"

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"

        renderscriptTargetApi 23
        renderscriptSupportModeEnabled true
    }
}
dependencies {
    implementation 'com.facebook.react:react-native:[0.32,)'
}
```
```bash
线上打包：项目目录下
react-native run-android --variant=release
# or
离线打包：cd 项目-> cd android
 ./gradlew assembleRelease
```
