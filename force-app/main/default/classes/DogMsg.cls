public with sharing class DogMsg {
    
    @AuraEnabled public Id id;
    @AuraEnabled public String name;
    @AuraEnabled public String age;
    @AuraEnabled public String breed;
    @AuraEnabled public String description;
    @AuraEnabled public String sex;
    @AuraEnabled public String shelter;
    @AuraEnabled public String imageURL;

    public DogMsg(Dog__c d, String shelterName) {
        this.id = d.Id;
        this.name = d.Name;
        this.age = d.Age__c;
        this.breed = d.Breed__c;
        this.description = d.Description__c;
        this.sex = d.Sex__c;
        this.shelter = shelterName;
        this.imageURL = d.Image_URL__c;
    }

}
