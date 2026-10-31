LOCAL_PATH := $(call my-dir)

INC_FLAGS := -I../.. -I../../core -I../../vendor -I../../vendor/quickjs -I../../vendor/yoga -I../../vendor/lexbor -I../../vendor/blend2d

# Module 1A: ASIMD for ARM64 Phones
ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
include $(CLEAR_VARS)
LOCAL_MODULE := blend2d_asimd
LOCAL_CFLAGS := -std=c11 -O2 -flto $(INC_FLAGS) -DBL_STATIC=1 -DBL_BUILD_NO_JIT=1 -DBL_BUILD_OPT_ASIMD=1 -DBL_TARGET_OPT_ASIMD -DNDEBUG
LOCAL_CPPFLAGS := -std=c++20 -O2 -flto -fno-exceptions -fno-rtti $(INC_FLAGS) -DBL_STATIC=1 -DBL_BUILD_NO_JIT=1 -DBL_BUILD_OPT_ASIMD=1 -DBL_TARGET_OPT_ASIMD -DNDEBUG
LOCAL_SRC_FILES := ../../../vendor/blend2d/codec/pngops_asimd.cpp \
                   ../../../vendor/blend2d/compression/checksum_asimd.cpp \
                   ../../../vendor/blend2d/opentype/otglyf_asimd.cpp
include $(BUILD_STATIC_LIBRARY)
endif

# Module 1B: SSE4.2 / SSSE3 for x86_64 PC Emulators
ifeq ($(TARGET_ARCH_ABI),x86_64)
include $(CLEAR_VARS)
LOCAL_MODULE := blend2d_sse
LOCAL_CFLAGS := -std=c11 -O2 -flto $(INC_FLAGS) -DBL_STATIC=1 -DBL_BUILD_NO_JIT=1 -msse4.2 -mssse3 -mpclmul -DNDEBUG
LOCAL_CPPFLAGS := -std=c++20 -O2 -flto -fno-exceptions -fno-rtti $(INC_FLAGS) -DBL_STATIC=1 -DBL_BUILD_NO_JIT=1 -msse4.2 -mssse3 -mpclmul -DNDEBUG
LOCAL_SRC_FILES := ../../../vendor/blend2d/codec/pngops_sse2.cpp \
                   ../../../vendor/blend2d/compression/checksum_sse4_2.cpp \
                   ../../../vendor/blend2d/core/pixelconverter_ssse3.cpp \
                   ../../../vendor/blend2d/opentype/otglyf_sse4_2.cpp
include $(BUILD_STATIC_LIBRARY)
endif

# Module 2: Main RoopM Engine
include $(CLEAR_VARS)
LOCAL_MODULE := roopm_app

LOCAL_CFLAGS := -std=c11 -O2 -flto $(INC_FLAGS) -DBL_STATIC=1 -DBL_BUILD_NO_JIT=1 -DCONFIG_VERSION=\"2024-01-13\" -DLEXBOR_STATIC -D_GNU_SOURCE
LOCAL_CPPFLAGS := -std=c++20 -O2 -flto -fno-exceptions -fno-rtti $(INC_FLAGS) -DBL_STATIC=1 -DBL_BUILD_NO_JIT=1 -DCONFIG_VERSION=\"2024-01-13\" -DLEXBOR_STATIC
LOCAL_LDFLAGS := -Wl,--gc-sections -Wl,--strip-all -Wl,--exclude-libs,libblend2d_asimd.a -flto -u ANativeActivity_onCreate

ifeq ($(TARGET_ARCH_ABI),arm64-v8a)
LOCAL_CFLAGS += -DBL_BUILD_OPT_ASIMD=1
LOCAL_CPPFLAGS += -DBL_BUILD_OPT_ASIMD=1
LOCAL_STATIC_LIBRARIES := blend2d_asimd android_native_app_glue
else ifeq ($(TARGET_ARCH_ABI),x86_64)
LOCAL_CFLAGS += -DBL_BUILD_OPT_SSE2=1 -DBL_BUILD_OPT_SSSE3=1 -DBL_BUILD_OPT_SSE4_2=1
LOCAL_CPPFLAGS += -DBL_BUILD_OPT_SSE2=1 -DBL_BUILD_OPT_SSSE3=1 -DBL_BUILD_OPT_SSE4_2=1
LOCAL_STATIC_LIBRARIES := blend2d_sse android_native_app_glue
else
LOCAL_STATIC_LIBRARIES := android_native_app_glue
endif

LOCAL_SRC_FILES := ../../../core/roopm_render.cpp \
                   ../../../core/roopm_font.cpp \
                   ../../../core/roopm_image.cpp \
                   ../../../platform/android/platform_android.cpp \
                   ../../../app/app.cpp \
                   ../../../tests_src/quickjs_unity.c \
                   ../../../tests_src/lexbor_unity.c \
                   ../../../tests_src/blend2d_unity.cpp \
                   ../../../vendor/blend2d/geometry/sizetable.cpp \
                   ../../../vendor/yoga/yoga/YGConfig.cpp \
                   ../../../vendor/yoga/yoga/YGEnums.cpp \
                   ../../../vendor/yoga/yoga/YGNode.cpp \
                   ../../../vendor/yoga/yoga/YGNodeLayout.cpp \
                   ../../../vendor/yoga/yoga/YGNodeStyle.cpp \
                   ../../../vendor/yoga/yoga/YGPixelGrid.cpp \
                   ../../../vendor/yoga/yoga/YGValue.cpp \
                   ../../../vendor/yoga/yoga/algorithm/AbsoluteLayout.cpp \
                   ../../../vendor/yoga/yoga/algorithm/Baseline.cpp \
                   ../../../vendor/yoga/yoga/algorithm/Cache.cpp \
                   ../../../vendor/yoga/yoga/algorithm/CalculateLayout.cpp \
                   ../../../vendor/yoga/yoga/algorithm/FlexLine.cpp \
                   ../../../vendor/yoga/yoga/algorithm/PixelGrid.cpp \
                   ../../../vendor/yoga/yoga/config/Config.cpp \
                   ../../../vendor/yoga/yoga/debug/AssertFatal.cpp \
                   ../../../vendor/yoga/yoga/debug/Log.cpp \
                   ../../../vendor/yoga/yoga/event/event.cpp \
                   ../../../vendor/yoga/yoga/node/LayoutResults.cpp \
                   ../../../vendor/yoga/yoga/node/Node.cpp

LOCAL_LDLIBS := -llog -landroid -lm
include $(BUILD_SHARED_LIBRARY)

$(call import-module,android/native_app_glue)
