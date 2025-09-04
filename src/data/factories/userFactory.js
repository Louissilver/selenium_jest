import { faker } from '@faker-js/faker';

/**
 * User data factory for generating test data
 */
export class UserFactory {
  /**
   * Generate a random user object
   * @returns {Object} User object with fake data
   */
  static generateUser() {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      password: faker.internet.password({ length: 12 }),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
      company: {
        name: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
      },
      preferences: {
        language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'pt']),
        currency: faker.finance.currencyCode(),
        timezone: faker.date.timeZone(),
      },
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  }

  /**
   * Generate a user with specific attributes
   * @param {Object} overrides - Attributes to override
   * @returns {Object} User object with overridden attributes
   */
  static generateUserWith(overrides = {}) {
    const baseUser = this.generateUser();
    return { ...baseUser, ...overrides };
  }

  /**
   * Generate multiple users
   * @param {number} count - Number of users to generate
   * @returns {Array} Array of user objects
   */
  static generateUsers(count = 5) {
    return Array.from({ length: count }, () => this.generateUser());
  }

  /**
   * Generate a simple user for basic tests
   * @returns {Object} Simple user object
   */
  static generateSimpleUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'TestPassword123!',
    };
  }

  /**
   * Generate an admin user
   * @returns {Object} Admin user object
   */
  static generateAdminUser() {
    return this.generateUserWith({
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      isActive: true,
      isVerified: true,
    });
  }

  /**
   * Generate a guest user
   * @returns {Object} Guest user object
   */
  static generateGuestUser() {
    return {
      id: faker.string.uuid(),
      sessionId: faker.string.alphanumeric(32),
      isGuest: true,
      createdAt: new Date(),
    };
  }

  /**
   * Generate user credentials for login tests
   * @returns {Object} User credentials
   */
  static generateCredentials() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };
  }

  /**
   * Generate invalid user data for negative tests
   * @returns {Object} Invalid user data
   */
  static generateInvalidUser() {
    return {
      firstName: '', // Empty first name
      lastName: faker.string.alphanumeric(256), // Too long last name
      email: 'invalid-email', // Invalid email format
      password: '123', // Too short password
      phone: 'invalid-phone', // Invalid phone format
    };
  }
}
