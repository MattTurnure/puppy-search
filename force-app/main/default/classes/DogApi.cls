public with sharing class DogApi {

    @AuraEnabled(cacheable=true)
    public static String getBreeds() {
        String api = 'https://dog.ceo/api/breeds/list/all';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(api);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);

        return res.getBody();
    }

    @AuraEnabled(cacheable=true)
    public static String getImagesByBreed(String breedName) {
        String api = 'https://dog.ceo/api/breed/'+ breedName +'/images';
        HttpRequest req = new HttpRequest();
        req.setEndpoint(api);
        req.setMethod('GET');
        Http http = new Http();
        HTTPResponse res = http.send(req);

        return res.getBody();
    }

    @AuraEnabled(cacheable=true)
    public static String getDogs() {
        List<Dog__c> dogs = [
            SELECT Id, Name, Age__c, Breed__c, Sex__c, Shelter__c, Description__c, Image_URL__c
            FROM Dog__c
            LIMIT 15
        ];

        List<DogMsg> dogMsgList = new List<DogMsg>();

        for (Dog__c d : dogs) {
            String shelterName = getShelterName(d.Shelter__c);
            dogMsgList.add(new DogMsg(d, shelterName));
        }

        return JSON.serialize(dogMsgList);
    }

    private static String getShelterName(Id recordId) {
        Account act = [
            SELECT Id, Name
            FROM Account
            WHERE Id = :recordId
            LIMIT 1
        ];

        return act.Name;
    }

}
