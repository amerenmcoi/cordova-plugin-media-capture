/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var MediaFile = require('./MediaFile');

function wrapMediaFiles (pluginResult) {
    var mediaFiles = [];
    var i;
    for (i = 0; i < pluginResult.length; i++) {
        var mediaFile = new MediaFile();
        mediaFile.name = pluginResult[i].name;

        // Backwards compatibility
        mediaFile.localURL = pluginResult[i].localURL || pluginResult[i].fullPath;
        mediaFile.fullPath = pluginResult[i].fullPath;
        mediaFile.type = pluginResult[i].type;
        mediaFile.lastModifiedDate = pluginResult[i].lastModifiedDate;
        mediaFile.size = pluginResult[i].size;
        mediaFiles.push(mediaFile);
    }
    return mediaFiles;
}

function wrapVideoMediaFiles (pluginResult) {
    var mediaFiles = [];
    var i;
    for (i = 0; i < pluginResult.length; i++) {
        var mediaResult = {
            image: undefined,
            video: undefined,
        };
        var image = new MediaFile();
        var video = new MediaFile();
        var imageDict = pluginResult[i].image; // {image: foo}};
        var videoDict = pluginResult[i].video; // {video: foo}};

        // image -  Backwards compatibility
        image.name = imageDict.name;
        image.localURL = imageDict.localURL || imageDict.fullPath;
        image.fullPath = imageDict.fullPath;
        image.type = imageDict.type;
        image.lastModifiedDate = imageDict.lastModifiedDate;
        image.size = imageDict.size;

        // video - Backwards compatibility
        video.name = videoDict.name;
        video.localURL = videoDict.localURL || videoDict.fullPath;
        video.fullPath = videoDict.fullPath;
        video.type = videoDict.type;
        video.lastModifiedDate = videoDict.lastModifiedDate;
        video.size = videoDict.size;

        mediaResult.image = image;
        mediaResult.video = video;
        mediaFiles.push(mediaResult);
    }
    return mediaFiles;
}

module.exports = {
    wrapMediaFiles: wrapMediaFiles,
    wrapVideoMediaFiles: wrapVideoMediaFiles,
};
