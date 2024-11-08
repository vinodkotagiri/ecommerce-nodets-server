export type UserType= 'admin' | 'customer'|'vendor';

export class User{
    constructor(
        public firstName: string,
        public lastName: string='',
        public email: string,
        public password: string,
        public userType: UserType = 'customer', 
        public emailVerified: boolean = false,
        public phoneVerified: boolean = false,
        public phone?: string,
        public emailVerificationCode?: string,
        public phoneVerificationCode?: string,
    ){}
}