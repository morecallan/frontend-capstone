"use strict";


app.controller('brushingCtrl', function ($scope, $route, $location, $rootScope, $routeParams, $timeout, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

$rootScope.stopInterval();

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    $rootScope.alreadyBrushedForThisTime = false;

    $scope.submitBrushingCompleteData = () => {
        let brushTime = new Date();
        brushingDataFactory.runBrushingDataCheckThenSubmitNewIfCool($routeParams.subuid, brushTime);
    };


    /********************************************
    **        SELECTING SONG FUNCTIONALITY     **
    ********************************************/
    $scope.selectSongMode = true;
    $scope.$watch($scope.selectSongMode);
    $scope.allSongsSelected = false;
    $scope.$watch($scope.allSongsSelected);

    $scope.songsLeft = [{icon: 'music_note'},{icon: 'music_note'},{icon: 'music_note'},{icon: 'music_note'}];

    $rootScope.mplaylist = [];
    $scope.$watch($rootScope.mplaylist);

    $scope.usersPlaylist = [];
    $scope.$watch($scope.usersPlaylist);



    $scope.addSongToPaylist = (selectedSong, index) => {
        if ($rootScope.mplaylist.length < 4) {
            $scope.songs[index].chosenAlready = true;
            let SMSound = soundManager.createSound({
                id: selectedSong.id,
                url: selectedSong.url
            });
            $rootScope.mplaylist.push(selectedSong);
            $scope.usersPlaylist.push(SMSound);
            let placeHolderToRemove = $scope.songsLeft.length - 1;
            $scope.songsLeft.splice(placeHolderToRemove, 1);
            if ($rootScope.mplaylist.length === 4) {
                $scope.allSongsSelected = true;
            }
        } else {
            $scope.allSongsSelected = true;
            $scope.resetSongSelectionMode();
        }
    };

    $scope.switchToBrushingMode = () => {
        $rootScope.mplaylist = [];
        $scope.selectSongMode = false;
        $scope.usersPlaylist[0].play();
        $timeout($scope.submitBrushingCompleteData, 120000);
    };

    $scope.resetSongSelectionMode = () => {
      $rootScope.mplaylist = [];
      $scope.allSongsSelected = false;
    }

    $scope.nowPlaying = "";

    soundManager.defaultOptions = {
        autoLoad: false,        // enable automatic loading (otherwise .load() will call with .play())
        autoPlay: true,        // enable playing of file ASAP (much faster if "stream" is true)
        loops: 1,               // number of times to play the sound. Related: looping (API demo)
        stream: true,           // allows playing before entire file has loaded (recommended)
    };

    $scope.countOfSongsPlayed = 0;
    $scope.$watch($scope.countOfSongsPlayed);

    if ($scope.countOfSongsPlayed === 4) {
        $scope.submitBrushingCompleteData();
    }

    $scope.songs = [
            {
                id: 'one',
                title: 'Jump for Joy',
                artist: 'Scott Holmes',
                url: './songs/JumpForJoy.m4a',
                img: './img/songCovers/dance1.png',
                chosenAlready: false
            },
            {
                id: 'two',
                title: 'Requiem For A Fish',
                artist: 'The Freak Fandango Orchestra',
                url: './songs/RequiemForAFish.m4a',
                img: './img/songCovers/dance2.png',
                chosenAlready: false
            },
            {
                id: 'three',
                title: 'Running',
                artist: 'Jens East',
                url: './songs/RequiemForAFish.m4a',
                img: './img/songCovers/dance3.png',
                chosenAlready: false
            },
            {
                id: 'four',
                title: 'Cheese',
                artist: 'David Szesztay',
                url: './songs/Cheese.m4a',
                img: './img/songCovers/dance4.png',
                chosenAlready: false
            },
            {
                id: 'five',
                title: 'Toy Shop',
                artist: 'David Szesztay',
                url: './songs/ToyShop.m4a',
                img: './img/songCovers/dance5.png',
                chosenAlready: false
            },
            {
                id: 'six',
                title: "They're Coming",
                artist: 'Elysian Bailey',
                url: './songs/TheyreComing.m4a',
                img: './img/songCovers/dance6.png',
                chosenAlready: false
            },
            {
                id: 'seven',
                title: 'The Plan Worked',
                artist: 'Dave Depper',
                url: './songs/ThePlanWorked.m4a',
                img: './img/songCovers/dance7.png',
                chosenAlready: false
            },
            {
                id: 'eight',
                title: 'Theme From YUM',
                artist: 'Dr. Sparkles',
                url: './songs/ThemeFromYUM.m4a',
                img: './img/songCovers/dance8.png',
                chosenAlready: false
            },
            {
                id: 'nine',
                title: 'Upbeat Whistle',
                artist: 'Dave Depper',
                url: './songs/UpbeatWhistle.m4a',
                img: './img/songCovers/dance9.png',
                chosenAlready: false
            }
        ];


});
