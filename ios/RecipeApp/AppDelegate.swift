import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
//import RNCPushNotificationIOS

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "RecipeApp"
    self.dependencyProvider = RCTAppDependencyProvider()
    
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }
  
//  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
//    RNCPushNotificationIOS.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
//  }
//  
//  // Optional: Handle push notification registration errors
//  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
//    print("Failed to register for remote notifications: \(error)")
//  }
//  
//  // Required: Handle remote notifications
//  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
//    RNCPushNotificationIOS.didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
//  }
  
  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
