//
//  Attributes.swift
//  Timer
//
//  Created by Kartar Singh Jabanda on 09/02/2025.
//

import ActivityKit

struct TimerActivityAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var emoji: String
    }
    
    var name: String
}
