const logAudit = require('../utils/audit-logger');
const { all, get, run } = require('../utils/db-async');

const getAllRTS = async (req, res) => {
    try {
        const query = `
            SELECT rts.*, seller.name as seller_name 
            FROM rts 
            LEFT JOIN seller ON rts.seller_id = seller.id
            ORDER BY rts.created_at DESC
        `;
        const rows = await all(query);
        res.status(200).json({success:true, data:rows});
    } catch(err) {
        res.status(500).json({success:false, data:`Internal Server Error: ${err.message}`});
    }
}

const getRTS = async (req, res) => {
    try {
        const { id } = req.params;
        const row = await get(`SELECT * FROM rts WHERE id = ?`, [id]);
        
        if(!row) return res.status(404).json({success:false, data:"Record not found."});
        
        res.status(200).json({success:true, data:row});
    } catch(err) {
        res.status(500).json({success:false, data:`Internal Server Error: ${err.message}`});
    }
}

const createRTS = async (req, res) => {
    try {
        const { seller_id, customer_name, tracking_no, product_name, description, staff_id } = req.body;

        if(!seller_id || !tracking_no || !staff_id) {
            return res.status(400).json({success:false, data:"Seller, Tracking No, and Staff ID are required."});
        }

        const result = await run(`
            INSERT INTO rts (seller_id, customer_name, tracking_no, product_name, description, status, staff_id)
            VALUES (?, ?, ?, ?, ?, 'pending', ?)
        `, [seller_id, customer_name, tracking_no, product_name, description, staff_id]);

        await logAudit(req.user.id, 'CREATE', 'rts', result.lastID, `Created RTS record for tracking ${tracking_no}`, req.ip);

        res.status(201).json({success:true, data:"RTS Record created.", id: result.lastID});
    } catch(err) {
        res.status(500).json({success:false, data:`Internal Server Error: ${err.message}`});
    }
}

const updateRTS = async (req, res) => {
    try {
        const { id } = req.params;
        const { seller_id, customer_name, tracking_no, product_name, description, status, staff_id } = req.body;

        if(!id) return res.status(400).json({success:false, data:"ID is required."});

        await run(`
            UPDATE rts
            SET 
                seller_id = COALESCE(?, seller_id),
                customer_name = COALESCE(?, customer_name),
                tracking_no = COALESCE(?, tracking_no),
                product_name = COALESCE(?, product_name),
                description = COALESCE(?, description),
                status = COALESCE(?, status),
                staff_id = COALESCE(?, staff_id)
            WHERE id = ?
        `, [seller_id, customer_name, tracking_no, product_name, description, status, staff_id, id]);

        await logAudit(req.user.id, 'UPDATE', 'rts', id, `Updated RTS record ${id}`, req.ip);

        res.status(200).json({success:true, data:"RTS Record updated."});
    } catch(err) {
        res.status(500).json({success:false, data:`Internal Server Error: ${err.message}`});
    }
}

const deleteRTS = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) return res.status(400).json({success:false, data:"ID is required."});

        await run(`DELETE FROM rts WHERE id = ?`, [id]);
        await logAudit(req.user.id, 'DELETE', 'rts', id, `Deleted RTS record ${id}`, req.ip);

        res.status(200).json({success:true, data:"RTS Record deleted."});
    } catch(err) {
        res.status(500).json({success:false, data:`Internal Server Error: ${err.message}`});
    }
}

module.exports = { getAllRTS, getRTS, createRTS, updateRTS, deleteRTS };