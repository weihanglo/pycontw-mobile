![](https://cdn.rawgit.com/weihanglo/pycontw-mobile/master/.github/icon-logo.svg)

#    [![](https://cdn.rawgit.com/weihanglo/pycontw-mobile/master/.github/pycon-logo.svg)](https://tw.pycon.org) PyCon Taiwan Offical Conference App

[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<a href="https://play.google.com/store/apps/details?id=com.pycontwmobile"><img alt="Get it on Google Play" src=".github/google-play.png" width="135px"></a>
<a href="https://itunes.apple.com/app/pycontw-17/id1244168803"><img alt="Download on the App Store" src="https://cdn.rawgit.com/weihanglo/pycontw-mobile/master/.github/app-store.svg" ></a>

The open source conference app for [PyCon Taiwan 2017][pycontw-website]. Powered by [React Native][react-native] and other brilliant tools.

<img src=".github/ios-framed.png" height="400px"/><img src=".github/android-framed.png" height="400px"/>


## Project Info

- **Platform**: [Android][google-play] & [iOS][app-store]
- **State Management**: [Redux][redux] ([React Redux][react-redux])
- **Code Style**: [Standard][standardjs]
- **Navigation**: [React Navigation][react-navigation]
- **Async Actions**: [Redux Thunk][redux-thunk]
- **Internationalization**: [React Native i18n][react-native-i18n] & [Moment.js][momentjs]
- **Other Native Modules**:
  - [React Native Device Info][react-native-device-info]
  - [React Native SVG][react-native-svg]
  - [React Native Splash Screen][react-native-splash-screen]
  - [React Native Vector Icons][react-native-vector-icons]


## Installation

### iOS

1. Use `yarn` to install all dependencies.
2. Open `ios/PyConTWMobile.xcodeproj` in **Xcode** and click `Run`.
3. Alternative, if you have installed [react-native-cli][react-native-started]. Type in terminal,
    ```bash
    react-native run-ios
    ```

### Android

1. Use `yarn`to install all dependencies.
2. Open the project in `android/` directory with **Android Studio**, then click `Run`.
3. Alternative, if you have installed [react-native-cli][react-native-started]. Type in terminal,
    ```bash
    react-native run-android
    ```

## License

[MIT](LICENSE)


<!-- links -->

[app-store]: https://itunes.apple.com/app/pycontw-17/id1244168803
[google-play]: https://play.google.com/store/apps/details?id=com.pycontwmobile
[momentjs]: https://momentjs.com/
[pycontw-website]: https://tw.pycon.org/
[react-native-device-info]: https://github.com/rebeccahughes/react-native-device-info
[react-native-i18n]: https://github.com/AlexanderZaytsev/react-native-i18n
[react-native-splash-screen]: https://github.com/crazycodeboy/react-native-splash-screen
[react-native-started]: https://facebook.github.io/react-native/docs/getting-started.html
[react-native-svg]: https://github.com/react-native-community/react-native-svg
[react-native-vector-icons]: https://github.com/oblador/react-native-vector-icons
[react-native]: https://facebook.github.io/react-native/
[react-navigation]: https://reactnavigation.org/
[react-redux]: https://github.com/reactjs/react-redux
[redux-thunk]: https://github.com/gaearon/redux-thunk
[redux]: https://github.com/reactjs/redux
[standardjs]: https://standardjs.com
