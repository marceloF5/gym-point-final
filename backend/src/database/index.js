import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Checkin from '../app/models/Checkin';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/HelpOrder';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import User from '../app/models/User';

const models = [Checkin, Enrollment, Plan, Student, User, HelpOrder];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
