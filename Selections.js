


// import yourhandle from './countrycitystatejson';
import yourhandle from 'countrycitystatejson';


// let   yourhandle= require('countrycitystatejson')
export default class Selections
{
    
    /**
     * 
     * @returns an array containing all the names of all countries
    */
    static getCountryNames(){
        let db = yourhandle.getCountries(); 
        let a = []; 
        let arr  = db.map(cntry => {
        return a.push(cntry.name)
        })
        // console.log(a); 
        return a; 
    }
    
    /**
     * This is a helper method for the function getRegions
     * @param {String} name name of the country of interest
     * @returns It returns the shortname of the country of interest
     */
   static getRegionShortByName(name){
        let db = yourhandle.getCountries(); 
        let a; 
        try {
            a = db.filter(cntry => cntry.name === name)[0].shortName; 
            console.log(a); 
        } catch (error) {
            
        }
        return a; 
    }

   /**
     * 
     * @param {String} name, is the name of the Country of interest
     * @returns it returns an array of the region/state/province of the parameter name
     */
    static getRegions(name){
        // let db = yourhandle.getCountries(); 
        let shortname = getRegionShortByName(name);
        let db= yourhandle.getStatesByShort(shortname); 

        return db; 
    }

    /**
     * 
     * @param {String} country_shortName is the shortname of the country of interest.
     * @param {*} regionName is the name of th region/state/province of interest.
     * @returns It returns an array of cities that belongs to the country and region/state/province of interest. 
     */

    static getCityList(country_shortName, regionName){
        let b = yourhandle.getCities(country_shortName, regionName)
        return b ; 
    }


}


let db = Selections
.getCountryNames()
console.log(db); 













