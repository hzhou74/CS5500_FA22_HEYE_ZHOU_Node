/**
 * @file Declares the user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @class {User} define default value for class
 * @property {string} username user name
 * @property {string} password password
 * @property {string} firstName first name
 * @property {string} lastName last name
 * @property {string} email email
 * @property {string} profilePhoto profile photo
 * @property {string} headerImage image
 * @property {string} biography info on user
 * @property {Date} dateOfBirth date of birth
 * @property {Date} joined date of joined
 * @property {AccountType} accountType account type
 * @property {Location} location location
 * @property {MartialStatus} martialStatus martialStatus
 */
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}

