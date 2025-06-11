import ActivityKit
import SwiftUI

struct TimerAttributes: ActivityAttributes {
    public typealias TimerStatus = ContentState
    
    public struct ContentState: Codable, Hashable {
        var timerId: String
        var title: String
        var startTime: Double // Unix timestamp in milliseconds
        var duration: Double // Duration in seconds
        var paused: Bool
        var lastPaused: Double? // Unix timestamp in milliseconds
        var widgetUrl: String?
    }
    
    var key: String
} 