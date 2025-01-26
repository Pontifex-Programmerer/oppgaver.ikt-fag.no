const Alias = require('../models/alias');
const {
    createFeedback,
    resourceNotFound
} = require('../handlers/httpFeedbackHandler');

const aliashome = (req,res,next)=>{
    const {alias} = req.params;
    res.render('aliashome');
}



// This controller should return a list of available aliases, as json.
const getAliasList = async (req, res, next) => {
    let feedback = resourceNotFound();
    try {
        // Only return Alias' without any assigned users. Unclaimed alias'
        const aliasEntities = await Alias.find({'user':null});
        if(aliasEntities){
            const aliasList = aliasEntities.map(entity => entity.alias);
            feedback = createFeedback(200, 'Full list of aliases was retrieved!', true, aliasEntities);
        }
    } catch (error) {
        console.error('getAliasList: controller produced an error! ', error.message);
    }
    res.status(feedback.statuscode).json(feedback);
}

const postClaimAlias = async (req, res, next) => {
    let feedback = resourceNotFound();
    const {alias,_id} = req.body;
    try {
        const aliasEntity = await Alias.claim(_id,alias);
        console.log('alias entity', aliasEntity)
        if(aliasEntity){
            createFeedback(200, `Your baptism is complete. From now on you shall bear the name of ${alias}`, true, aliasEntity);
        }
    } catch (error) {
        createFeedback(404, "An error occurred when trying to claim your alias!", false, error);
    }
    res.status(feedback.statuscode).json(feedback);
}

module.exports={
    aliashome,
    getAliasList,
    postClaimAlias
}