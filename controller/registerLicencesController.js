const { Op } = require('sequelize');
const models = require('../models');
const genRes = require('../utils/responses');


const save = async (req, res) => {
    try {
        const { header } = req.body;
        const { details } = header;
        var registerLicences;
        if (header.registerId === 'AUTO') {
            const registerId = await generateNextSequence();
            console.log(registerId);
            const licenceNumber = await generateUniqueCode();
            console.log(licenceNumber);
            registerLicences = await models.RegisterLicences.create({
                registerId: registerId,
                dateOfFilling: header.dateOfFilling,
                poId: header.poId,
                clientId: header.clientId,
                variant: header.variant,
                details: details.map(detail => ({
                    licenceNumber: licenceNumber,
                    generatedDate: detail.generatedDate,
                    status: detail.status,
                    expirationDate: detail.expirationDate,
                    processorSN: detail.processorSN,
                    moboSN: detail.moboSN,
                    harddiskSN: detail.harddiskSN
                }))
            }, {
                include: [
                    {
                        association: 'details', // Use the alias 'details'
                    }
                ]
            });
        } else {
            const existingRegisterLicences = await models.RegisterLicences.findOne({
                where: { registerId: header.registerId }
            });
            registerLicences = await models.RegisterLicences.update({
                registerId: header.registerId,
                dateOfFilling: header.dateOfFilling,
                poId: header.poId,
                clientId: header.clientId,
                variant: header.variant,
                details: details.map(detail => ({
                    licenceNumber: detail.licenceNumber,
                    generatedDate: detail.generatedDate,
                    status: detail.status,
                    expirationDate: detail.expirationDate,
                    processorSN: detail.processorSN,
                    moboSN: detail.moboSN,
                    harddiskSN: detail.harddiskSN
                }))
            },{
                where: { registerId: header.registerId }
            }  
            );

            // Update the associated details
            await models.RegisterLicencesDetails.destroy({
                where: { registerLicencesId: existingRegisterLicences.id }
            });
        
            await models.RegisterLicencesDetails.bulkCreate(
                details.map(detail => ({
                    registerLicencesId: existingRegisterLicences.id,
                    licenceNumber: detail.licenceNumber,
                    generatedDate: detail.generatedDate,
                    status: detail.status,
                    expirationDate: detail.expirationDate,
                    processorSN: detail.processorSN,
                    moboSN: detail.moboSN,
                    harddiskSN: detail.harddiskSN
                }))
            );

        }


        return genRes.sendSuccessRes(res, {registerLicences}, 'Register licences successfully');
    } catch (error) {
        console.log(error);
        return genRes.sendErrorRes(res, {}, 'Register licences failed' + error);
    }
}

async function generateNextSequence() {
    const prefix = 'LGAS';
    // Find the maximum existing sequence for the given prefix
    const maxSequence = await models.RegisterLicences.max('registerId', {
        where: { registerId: { [Op.startsWith]: prefix } }
    });

    let nextSequenceNumber = 1;

    if (maxSequence) {
        // Extract the numeric part and increment it by 1
        const numericPart = parseInt(maxSequence.slice(prefix.length), 10);
        if (!isNaN(numericPart)) {
            nextSequenceNumber = numericPart + 1;
        }
    }

    // Format the sequence number to have leading zeros
    const formattedSequenceNumber = String(nextSequenceNumber).padStart(4, '0');

    // Combine the prefix and formatted sequence number
    const nextSequence = `${prefix}${formattedSequenceNumber}`;

    return nextSequence;
}

async function generateUniqueCode() {
    const code = generateRandomCode();
    const codeExists = await models.RegisterLicencesDetails.findOne({ where: { licenceNumber: code } });
  
    if (codeExists) {
      // If the code already exists, recursively call the function again to generate a new one
      return generateUniqueCode();
    }
  
    return code;
}

function generateRandomCode() {
    // Generate a random alphanumeric string of the desired format
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const code = Array.from({ length: 16 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    
    // Format the code into groups of 4 characters separated by hyphens
    return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}-${code.slice(12, 16)}`;
}

module.exports = { save }