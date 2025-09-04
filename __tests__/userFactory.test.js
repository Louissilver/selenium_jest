import { UserFactory } from '../src/data/factories/userFactory.js';

describe('UserFactory', () => {
  describe('generateUser', () => {
    it('should generate a user with all required properties', () => {
      const user = UserFactory.generateUser();

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('phone');
      expect(user).toHaveProperty('dateOfBirth');
      expect(user).toHaveProperty('address');
      expect(user).toHaveProperty('company');
      expect(user).toHaveProperty('preferences');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('should generate users with valid email format', () => {
      const user = UserFactory.generateUser();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(emailRegex.test(user.email)).toBe(true);
    });

    it('should generate users with non-empty names', () => {
      const user = UserFactory.generateUser();
      
      expect(user.firstName).toBeTruthy();
      expect(user.lastName).toBeTruthy();
      expect(typeof user.firstName).toBe('string');
      expect(typeof user.lastName).toBe('string');
    });

    it('should generate users with address object', () => {
      const user = UserFactory.generateUser();
      
      expect(user.address).toHaveProperty('street');
      expect(user.address).toHaveProperty('city');
      expect(user.address).toHaveProperty('state');
      expect(user.address).toHaveProperty('zipCode');
      expect(user.address).toHaveProperty('country');
    });
  });

  describe('generateUserWith', () => {
    it('should override specified properties', () => {
      const overrides = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };
      
      const user = UserFactory.generateUserWith(overrides);
      
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.email).toBe('john.doe@example.com');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username');
    });

    it('should work with empty overrides', () => {
      const user = UserFactory.generateUserWith();
      
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
    });
  });

  describe('generateUsers', () => {
    it('should generate specified number of users', () => {
      const users = UserFactory.generateUsers(3);
      
      expect(users).toHaveLength(3);
      expect(Array.isArray(users)).toBe(true);
    });

    it('should generate default number of users when count not specified', () => {
      const users = UserFactory.generateUsers();
      
      expect(users).toHaveLength(5);
    });

    it('should generate unique users', () => {
      const users = UserFactory.generateUsers(2);
      
      expect(users[0].id).not.toBe(users[1].id);
      expect(users[0].email).not.toBe(users[1].email);
    });
  });

  describe('generateSimpleUser', () => {
    it('should generate a simple user with basic properties', () => {
      const user = UserFactory.generateSimpleUser();
      
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user.password).toBe('TestPassword123!');
    });
  });

  describe('generateAdminUser', () => {
    it('should generate an admin user with admin properties', () => {
      const adminUser = UserFactory.generateAdminUser();
      
      expect(adminUser.role).toBe('admin');
      expect(adminUser.permissions).toContain('admin');
      expect(adminUser.permissions).toContain('read');
      expect(adminUser.permissions).toContain('write');
      expect(adminUser.permissions).toContain('delete');
      expect(adminUser.isActive).toBe(true);
      expect(adminUser.isVerified).toBe(true);
    });
  });

  describe('generateGuestUser', () => {
    it('should generate a guest user with guest properties', () => {
      const guestUser = UserFactory.generateGuestUser();
      
      expect(guestUser).toHaveProperty('id');
      expect(guestUser).toHaveProperty('sessionId');
      expect(guestUser.isGuest).toBe(true);
      expect(guestUser).toHaveProperty('createdAt');
      expect(guestUser.sessionId).toHaveLength(32);
    });
  });

  describe('generateCredentials', () => {
    it('should generate valid credentials', () => {
      const credentials = UserFactory.generateCredentials();
      
      expect(credentials).toHaveProperty('email');
      expect(credentials).toHaveProperty('password');
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(credentials.email)).toBe(true);
      expect(credentials.password.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe('generateInvalidUser', () => {
    it('should generate invalid user data for negative testing', () => {
      const invalidUser = UserFactory.generateInvalidUser();
      
      expect(invalidUser.firstName).toBe('');
      expect(invalidUser.lastName.length).toBe(256);
      expect(invalidUser.email).toBe('invalid-email');
      expect(invalidUser.password).toBe('123');
      expect(invalidUser.phone).toBe('invalid-phone');
    });
  });
});
