Pod::Spec.new do |s|
  s.name           = 'ExpoLiveActivities'
  s.version        = '1.0.0'
  s.summary        = 'Tracking Live Activity Module'
  s.description    = 'Tracking Live Activity Module for Timer'
  # left comments in with credits to @mrevanzak for the original module 🙏🏽
  s.author         = 'mrevanzak'
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = { :ios => '13.4' }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
