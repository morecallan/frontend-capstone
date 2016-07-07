"use strict";

app.factory("emailFactory", function(firebaseURL, $q, $http, $rootScope, credentialsFactory) {

  let api_key = "";

  let api_url = 'http://api2.getresponse.com';

  let getAPIKey = () => {
    credentialsFactory.getGetResponseCredentials().then((credentials) => {
      api_key = credentials.alpha;
    });
  };

  let addContact = (userEmail) => {

      var campaigns = {};

      $.ajax({
        url     : api_url,
        data    : JSON.stringify({
                    'jsonrpc'   : '2.0',
                    'method'    : 'get_campaigns',
                    'params'    : [
                      api_key,
                        {'name' : { 'EQUALS' : 'callanlmorrison' }}],
                    'id'        : 1
                }),
                type        : 'POST',
                contentType : 'application/json',
                dataType    : 'JSON',
                crossDomain : true,
                async       : false,
                success     : function(response) {
                    campaigns = response.result;
                }
            });

        // first key is the CAMPAIGN_ID required by next method
        // (this ID is constant and should be cached for future use)
        var CAMPAIGN_ID;
        for(var key in campaigns) {
            CAMPAIGN_ID = key;
            break;
        }

        $.ajax({
          url     : api_url,
          data    : JSON.stringify({
              'jsonrpc'    : '2.0',
              'method'    : 'add_contact',
              'params'    : [
                  api_key,
                  {
                    // identifier of 'test' campaign
                    'campaign'  : CAMPAIGN_ID,

                    // basic info
                    'email'     :  userEmail,
                  }
              ],
              'id'        : 2
          }),
          type        : 'POST',
          contentType : 'application/json',
          dataType    : 'JSON',
          crossDomain : true,
          async       : false,
          success     : function(response)
          {
                console.log('Contact added');
          }
        });
    };
  return {addContact: addContact};
});
