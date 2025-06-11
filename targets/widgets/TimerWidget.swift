import ActivityKit
import SwiftUI
import WidgetKit

// MARK: - Live Timer State
class LiveTimerState: ObservableObject {
    @Published var currentTime = Date()
    private var timer: Timer?
    
    init() {
        startTimer()
    }
    
    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            DispatchQueue.main.async {
                self.currentTime = Date()
            }
        }
    }
    
    deinit {
        timer?.invalidate()
    }
}

// MARK: - Live Countdown Component (Using SwiftUI's built-in countdown)
struct LiveCountdown: View {
    let timer: TimerAttributes.ContentState
    
    private var countdownDate: Date {
        let startDate = Date(timeIntervalSince1970: timer.startTime / 1000)
        let endDate = startDate.addingTimeInterval(timer.duration)
        return endDate
    }
    
    private var isCompleted: Bool {
        Date() >= countdownDate
    }
    
    var body: some View {
        if timer.paused {
            // Show static time when paused
            let (hours, minutes, seconds, _) = calculateTimerState(timer: timer)
            HStack(spacing: 2) {
                if hours > 0 {
                    Group {
                        Text("\(String(format: "%02d", hours))")
                        Text(":")
                    }
                }
                Text("\(String(format: "%02d", minutes))")
                Text(":")
                Text("\(String(format: "%02d", seconds))")
            }
            .monospacedDigit()
        } else if isCompleted {
            // Show 00:00 when completed
            Text("00:00")
                .monospacedDigit()
        } else {
            // Use SwiftUI's automatic countdown
            Text(countdownDate, style: .timer)
                .monospacedDigit()
                .contentTransition(.numericText())
        }
    }
}

// MARK: - Circular Progress View
struct CircularTimerProgress: View {
    let timer: TimerAttributes.ContentState
    
    private var progress: Double {
        let (_, _, _, progressValue) = calculateTimerState(timer: timer)
        return progressValue
    }
    
    var body: some View {
        ProgressView(value: progress)
            .progressViewStyle(.circular)
            .tint(Color("Color"))
            .frame(width: 24, height: 24)
            .animation(.smooth(duration: 0.5), value: progress)
    }
}

// MARK: - Enhanced Live Progress Bar
struct LiveProgressBar: View {
    let timer: TimerAttributes.ContentState
    
    private var progress: Double {
        calculateTimerState(timer: timer).3
    }
    
    var body: some View {
        ProgressView(value: progress)
            .tint(Color("Color"))
            .animation(.smooth(duration: 0.5), value: progress)
    }
}

@available(iOSApplicationExtension 18.0, *)
struct TimerActivityViewWithFamily: View {
    let context: ActivityViewContext<TimerAttributes>
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.activityFamily) var activityFamily

    var body: some View {
        switch activityFamily {
        case .small:
          TimerActivityViewSmall(context: context)
        case .medium:
            TimerActivityView(context: context)
        @unknown default:
            TimerActivityView(context: context)
        }
    }
}

struct TimerActivityView: View {
    let context: ActivityViewContext<TimerAttributes>
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        let timer = context.state
        
        VStack(alignment: .leading, spacing: 10) {
            Image("Timer")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(height: 14)

            VStack(alignment: .leading) {
                HStack {
                    Text(timer.paused ? "Paused" : "Running")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .contentTransition(.opacity)
                        .animation(.easeInOut(duration: 0.3), value: timer.paused)
                  
                    HStack(spacing: 8) {
                        CircularTimerProgress(timer: timer)
                        
                        LiveCountdown(timer: timer)
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(Color("Color"))
                    }
                  
                }.padding(.top, 5)
                Text(timer.title)
                    .font(.subheadline)
            }
            Spacer()
        }
        .padding(.all)
    }
}

struct TimerActivityViewSmall: View {
    let context: ActivityViewContext<TimerAttributes>
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        let timer = context.state
        
        HStack {
            VStack {
                HStack(alignment: .bottom) {
                    VStack(alignment: .leading) {
                        Text(timer.paused ? "Paused" : "Running")
                            .font(.headline)
                            .fontWeight(.semibold)
                            .contentTransition(.opacity)
                            .animation(.easeInOut(duration: 0.3), value: timer.paused)

                        HStack(spacing: 6) {
                            ProgressView(value: calculateTimerState(timer: timer).3)
                                .progressViewStyle(.circular)
                                .tint(Color("Color"))
                                .frame(width: 16, height: 16)
                            
                            LiveCountdown(timer: timer)
                                .font(.body)
                                .fontWeight(.semibold)
                                .foregroundColor(Color("Color"))
                        }
                    }

                    Spacer()

                    Image("Timer")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .padding(.bottom, 2.0)
                        .frame(height: 12)
                }

                LiveProgressBar(timer: timer)
            }
        }
        .padding(.all)
    }
}

struct TimerIslandBottom: View {
    let context: ActivityViewContext<TimerAttributes>

    var body: some View {
        let timer = context.state
        
        VStack(alignment: .leading, spacing: 10) {
            VStack(alignment: .leading) {
                HStack {
                    Text(timer.paused ? "Paused" : "Running")
                        .font(.title2)
                        .fontWeight(.semibold)
                        .contentTransition(.opacity)
                        .animation(.easeInOut(duration: 0.3), value: timer.paused)

                    HStack(spacing: 8) {
                        CircularTimerProgress(timer: timer)
                        
                        LiveCountdown(timer: timer)
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(Color("Color"))
                    }

                }.padding(.top, 5)
                Text(timer.title)
                    .font(.subheadline)
            }
            
            Spacer()
        }
        .padding(.horizontal)
    }
}

// MARK: - Timer Calculations (Simplified)
func calculateTimerState(timer: TimerAttributes.ContentState) -> (Int, Int, Int, Double) {
    let now = Date().timeIntervalSince1970 * 1000
    
    let elapsedMs: Double
    if timer.paused && timer.lastPaused != nil {
        elapsedMs = timer.lastPaused! - timer.startTime
    } else if timer.paused {
        elapsedMs = 0
    } else {
        elapsedMs = now - timer.startTime
    }
    
    let totalMs = timer.duration * 1000
    let remainingMs = max(0, totalMs - elapsedMs)
    let remainingSeconds = Int(ceil(remainingMs / 1000))
    
    let hours = remainingSeconds / 3600
    let minutes = (remainingSeconds % 3600) / 60
    let seconds = remainingSeconds % 60
    
    let progress = min(1.0, max(0.0, elapsedMs / totalMs))
    
    return (hours, minutes, seconds, progress)
}

@available(iOSApplicationExtension 18.0, *)
struct TimerWidgetIOS18: Widget {
    let kind: String = "Timer_Widget"

    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TimerAttributes.self) { context in
            TimerActivityViewWithFamily(context: context)
                .widgetURL(URL(string: context.state.widgetUrl ?? ""))
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image("Timer")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(height: 14)
                        .padding(.leading)
                }
                DynamicIslandExpandedRegion(.trailing) {
                }
                DynamicIslandExpandedRegion(.bottom) {
                    TimerIslandBottom(context: context)
                }
            } compactLeading: {
                Image("Timer")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 10)
            } compactTrailing: {
                CircularTimerProgress(timer: context.state)
            } minimal: {
                CircularTimerProgress(timer: context.state)
            }
            .widgetURL(URL(string: context.state.widgetUrl ?? ""))
        }
        .supplementalActivityFamilies([.small, .medium])
    }
}

struct TimerWidget: Widget {
    let kind: String = "Timer_Widget"

    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TimerAttributes.self) { context in
            TimerActivityView(context: context)
                .widgetURL(URL(string: context.state.widgetUrl ?? ""))
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Image("Timer")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(height: 14)
                        .padding(.leading)
                }
                DynamicIslandExpandedRegion(.trailing) {
                }
                DynamicIslandExpandedRegion(.bottom) {
                    TimerIslandBottom(context: context)
                }
            } compactLeading: {
                Image("Timer")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(height: 10)
            } compactTrailing: {
                CircularTimerProgress(timer: context.state)
            } minimal: {
                CircularTimerProgress(timer: context.state)
            }
            .widgetURL(URL(string: context.state.widgetUrl ?? ""))
        }
    }
}

extension TimerAttributes {
    fileprivate static var preview: TimerAttributes {
        TimerAttributes(key: "test")
    }
}

extension TimerAttributes.ContentState {
    fileprivate static var state: TimerAttributes.ContentState {
        TimerAttributes.ContentState(
            timerId: "test-timer",
            title: "Focus Session",
            startTime: Date().timeIntervalSince1970 * 1000 - 30000, // Started 30 seconds ago
            duration: 300, // 5 minutes for better preview
            paused: false,
            lastPaused: nil,
            widgetUrl: "timer://open/test-timer"
        )
    }
}

struct TimerActivityView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            TimerAttributes.preview
                .previewContext(
                    TimerAttributes.ContentState.state,
                    viewKind: .dynamicIsland(.minimal)
                )
                .previewDisplayName("Dynamic Island Minimal")

            TimerAttributes.preview
                .previewContext(
                    TimerAttributes.ContentState.state,
                    viewKind: .dynamicIsland(.compact)
                )
                .previewDisplayName("Dynamic Island Compact")

            TimerAttributes.preview
                .previewContext(
                    TimerAttributes.ContentState.state,
                    viewKind: .dynamicIsland(.expanded)
                )
                .previewDisplayName("Dynamic Island Expanded")

            TimerAttributes.preview
                .previewContext(
                    TimerAttributes.ContentState.state, viewKind: .content
                )
                .previewDisplayName("Content View")
        }
    }
}
