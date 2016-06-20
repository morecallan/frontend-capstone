"use strict";


app.controller('brushingCtrl', function ($scope, $location, $rootScope, $routeParams, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    $rootScope.alreadyBrushedForThisTime = false;

    $scope.submitBrushingCompleteData = () => {
        let brushTime = new Date();
        brushingDataFactory.runBrushingDataCheckThenSubmitNewIfCool($routeParams.subuid, brushTime);
    };

    $scope.allSongsSelected = false;
    
    $scope.songsLeft = [
        {
            icon: 'music_note'
        },
        {
            icon: 'music_note'
        },
        {
            icon: 'music_note'
        },
        {
            icon: 'music_note'
        },
    ];

    $scope.selectedSongs = [];


    $scope.songs = [
            {
                id: 'one',
                title: 'Jump for Joy',
                artist: 'Scott Holmes',
                url: './songs/JumpForJoy.m4a',
                img: './img/songCovers/dance1.png'
            },
            {
                id: 'two',
                title: 'Requiem For A Fish',
                artist: 'The Freak Fandango Orchestra',
                url: './songs/RequiemForAFish.m4a',
                img: './img/songCovers/dance2.png'
            },
            {
                id: 'three',
                title: 'Running',
                artist: 'Jens East',
                url: './songs/RequiemForAFish.m4a',
                img: './img/songCovers/dance3.png'
            },
            {
                id: 'four',
                title: 'Cheese',
                artist: 'David Szesztay',
                url: './songs/Cheese.m4a',
                img: './img/songCovers/dance4.png'
            },
            {
                id: 'five',
                title: 'Toy Shop',
                artist: 'David Szesztay',
                url: './songs/ToyShop.m4a',
                img: './img/songCovers/dance5.png'
            },
            {
                id: 'six',
                title: "They're Coming",
                artist: 'Elysian Bailey',
                url: './songs/TheyreComing.m4a',
                img: './img/songCovers/dance6.png'
            },
            {
                id: 'seven',
                title: 'The Plan Worked',
                artist: 'Dave Depper',
                url: './songs/ThePlanWorked.m4a',
                img: './img/songCovers/dance7.png'
            },
            {
                id: 'eight',
                title: 'Theme From YUM',
                artist: 'Dr. Sparkles',
                url: './songs/ThemeFromYUM.m4a',
                img: './img/songCovers/dance8.png'
            },
            {
                id: 'nine',
                title: 'Upbeat Whistle',
                artist: 'Dave Depper',
                url: './songs/UpbeatWhistle.m4a',
                img: './img/songCovers/dance9.png'
            }
        ];
});