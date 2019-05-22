//
//  UIImage+Orientation.h
//  MEL
//
//  Created by MCOI on 5/22/19.
//

#ifndef UIImage_Orientation_h
#define UIImage_Orientation_h
#import <UIKit/UIKit.h>

@interface UIImage (Orientation)

- (UIImage*)imageCorrectedForCaptureOrientation;
- (UIImage*)imageCorrectedForCaptureOrientation:(UIImageOrientation)imageOrientation;

@end
#endif /* UIImage_Orientation_h */
