//
//  TimerModule.swift
//  Timer
//
//  Created by Kartar Singh Jabanda on 09/02/2025.
//

import ExpoModulesCore
import ActivityKit
import Foundation

@objc(TimerModule)
class TimerModule: NSObject {
  
    @objc(startActivity:withResolver:withRejecter:)
    func startActivity(_ name: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        if ActivityAuthorizationInfo().areActivitiesEnabled {
            let attributes = TimerActivityAttributes(name: name)
            let state = TimerActivityAttributes.ContentState(emoji: "⏳")

            do {
                let activity = try Activity<TimerActivityAttributes>.request(
                    attributes: attributes,
                    contentState: state,
                    pushType: nil
                )
                
                resolve(activity.id) // Return the activity ID to React Native
            } catch {
                reject("START_ACTIVITY_ERROR", "Failed to start activity", error)
            }
        } else {
            reject("ACTIVITIES_DISABLED", "Live Activities are disabled", nil)
        }
    }
}
