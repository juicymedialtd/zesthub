
export default function handler(req, res) {

    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error})
    }
}