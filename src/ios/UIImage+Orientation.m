//
//  UIImage+Orientation.m
//  MEL
//
//  Created by MCOI on 5/22/19.
//

#import "UIImage+Orientation.h"

@implementation UIImage (Orientation)


- (UIImage*)imageCorrectedForCaptureOrientation:(UIImageOrientation)imageOrientation
{
    float rotation_radians = 0;
    bool perpendicular = false;

    switch (imageOrientation) {
            case UIImageOrientationUp :
            rotation_radians = 0.0;
            break;

            case UIImageOrientationDown:
            rotation_radians = M_PI; // don't be scared of radians, if you're reading this, you're good at math
            break;

            case UIImageOrientationRight:
            rotation_radians = M_PI_2;
            perpendicular = true;
            break;

            case UIImageOrientationLeft:
            rotation_radians = -M_PI_2;
            perpendicular = true;
            break;

        default:
            break;
    }

    UIGraphicsBeginImageContext(CGSizeMake(self.size.width, self.size.height));
    CGContextRef context = UIGraphicsGetCurrentContext();

    // Rotate around the center point
    CGContextTranslateCTM(context, self.size.width / 2, self.size.height / 2);
    CGContextRotateCTM(context, rotation_radians);

    CGContextScaleCTM(context, 1.0, -1.0);
    float width = perpendicular ? self.size.height : self.size.width;
    float height = perpendicular ? self.size.width : self.size.height;
    CGContextDrawImage(context, CGRectMake(-width / 2, -height / 2, width, height), [self CGImage]);

    // Move the origin back since the rotation might've change it (if its 90 degrees)
    if (perpendicular) {
        CGContextTranslateCTM(context, -self.size.height / 2, -self.size.width / 2);
    }

    UIImage* newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

- (UIImage*)imageCorrectedForCaptureOrientation
{
    return [self imageCorrectedForCaptureOrientation:[self imageOrientation]];
}

@end
