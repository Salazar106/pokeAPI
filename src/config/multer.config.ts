import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para social_security
const storageSocialSecurity = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.file)
        console.log(file)
        cb(null, 'uploads/players/social_security');
        // cb(null, 'C:/Users/Juan Fernando/Desktop/DISRUPTIVE WORK/Proyecto LAR/lar-api/uploads/social_security');
    },
    filename: function (req, file, cb) {

        const playerInformation = req.body

        console.log("USER ID MULTERCONFIG:", req.params.player_id)
        console.log("Info jugador en multer:", playerInformation)

        // const player_id = req.params.player_id
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const fileExt = path.extname(file.originalname);
        cb(null, `SSID_${currentDate}${fileExt}`);
        // cb(null, `SSID_${player_id}_${currentDate}${fileExt}`);
        // cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    }
});

// Configuración de almacenamiento para logo de ligas
const storageLeagueLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.file)
        console.log(file)
        cb(null, 'uploads/leagues/logo');
        // cb(null, 'C:/Users/Juan Fernando/Desktop/DISRUPTIVE WORK/Proyecto LAR/lar-api/uploads/social_security');
    },
    filename: function (req, file, cb) {

        const fileData = req.body

        console.log("LEAGUE ID MULTERCONFIG:", req.params.league_id)
        console.log("Info del archivo o body en multer:", fileData)

        // const player_id = req.params.player_id
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const fileExt = path.extname(file.originalname);
        cb(null, `SSID_${currentDate}${fileExt}`);
        // cb(null, `SSID_${player_id}_${currentDate}${fileExt}`);
        // cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    }
});

// Configuración de almacenamiento para logo de torneos
const storageTournamentLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.file)
        console.log(file)
        cb(null, 'uploads/tournaments/logo');
        // cb(null, 'C:/Users/Juan Fernando/Desktop/DISRUPTIVE WORK/Proyecto LAR/lar-api/uploads/social_security');
    },
    filename: function (req, file, cb) {

        const fileData = req.body

        console.log("TOURNAMENT ID MULTERCONFIG:", req.params.tournament_id)
        console.log("Info del archivo o body en multer:", fileData)

        // const player_id = req.params.player_id
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const fileExt = path.extname(file.originalname);
        cb(null, `SSID_${currentDate}${fileExt}`);
        // cb(null, `SSID_${player_id}_${currentDate}${fileExt}`);
        // cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    }
});
// Configuración de almacenamiento para logo de equipos de fútbol
const storageSoccerTeamLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.file)
        console.log(file)
        cb(null, 'uploads/soccer_teams/logo');
        // cb(null, 'C:/Users/Juan Fernando/Desktop/DISRUPTIVE WORK/Proyecto LAR/lar-api/uploads/social_security');
    },
    filename: function (req, file, cb) {

        const fileData = req.body

        console.log("SOCCER TEAM ID MULTERCONFIG:", req.params.soccer_team_id)
        console.log("Info del archivo o body en multer:", fileData)

        // const player_id = req.params.player_id
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const fileExt = path.extname(file.originalname);
        cb(null, `SSID_${currentDate}${fileExt}`);
        // cb(null, `SSID_${player_id}_${currentDate}${fileExt}`);
        // cb(null, Date.now() + path.extname(file.originalname)); // Agrega un timestamp al nombre del archivo
    }
});

const uploadSocialSecurity = multer({ storage: storageSocialSecurity });

const uploadLeagueLogoFile = multer({ storage: storageLeagueLogo });

const uploadTournamentLogoFile = multer({ storage: storageTournamentLogo });

const uploadSoccerTeamLogoFile = multer({ storage: storageSoccerTeamLogo });

export default { uploadSocialSecurity, uploadLeagueLogoFile, uploadTournamentLogoFile, uploadSoccerTeamLogoFile }

// filename: (req, file, cb) => {
//   // Generar un nombre único para el archivo
//   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
// }

