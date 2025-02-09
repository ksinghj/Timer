#import <React/RCTBridgeModule.h>
#import "TimerModule-Swift.h"  // Import the Swift file

@interface RCT_EXTERN_MODULE(TimerModule, NSObject)

RCT_EXTERN_METHOD(startActivity:withResolver:withRejecter:)

@end
