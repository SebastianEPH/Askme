-- --------------------------------------------------------
-- Host:                         b6hziqljw9smv3obfjhs-mysql.services.clever-cloud.com
-- Versión del servidor:         8.0.15-5 - Exherbo
-- SO del servidor:              Linux
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.exam
CREATE TABLE IF NOT EXISTS `exam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'Titulo del examen',
  `commentary` varchar(400) DEFAULT NULL COMMENT 'Comentario del examen',
  `cat_id` int(11) DEFAULT NULL COMMENT 'Categoría ID',
  `lev_id` int(11) DEFAULT NULL COMMENT 'Nivel ComplejidadID',
  `date_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
  `date_init` timestamp NULL DEFAULT NULL COMMENT 'fecha inicio del examen',
  `date_finish` timestamp NULL DEFAULT NULL COMMENT 'Fecha de finalización',
  `time_limit` time DEFAULT NULL COMMENT 'Tiempo limite',
  `cant_ques` int(100) DEFAULT NULL COMMENT 'Cantidad de preguntas',
  `ques_list` varchar(50) DEFAULT NULL COMMENT 'lista de preguntas',
  `user_id` int(11) DEFAULT NULL COMMENT 'Creador del examen',
  `is_show` int(1) NOT NULL DEFAULT '1' COMMENT 'es visible?',
  PRIMARY KEY (`id`),
  KEY `FK_exam_question_category` (`cat_id`),
  KEY `FK_exam_question_level` (`lev_id`),
  KEY `FK_exam_user` (`user_id`),
  CONSTRAINT `FK_exam_question_category` FOREIGN KEY (`cat_id`) REFERENCES `question_category` (`cat_id`),
  CONSTRAINT `FK_exam_question_level` FOREIGN KEY (`lev_id`) REFERENCES `question_level` (`lev_id`),
  CONSTRAINT `FK_exam_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.exam_user
CREATE TABLE IF NOT EXISTS `exam_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT 'Estudiante que  está tomando el examen',
  `date_init` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora de que el estudiante empezó ',
  `date_finish` timestamp NULL DEFAULT NULL COMMENT 'Fecha y hora de que el estudiante terminó el examen',
  `que_list_reply` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT 'respuestas del estudiante',
  `que_true_reply` int(11) DEFAULT NULL COMMENT 'respuestas correctas',
  `que_false_reply` int(11) DEFAULT NULL COMMENT 'respuesta inforrectas',
  `que_nothing_reply` int(11) DEFAULT NULL COMMENT 'Respuesta no respondida',
  `note` int(11) DEFAULT NULL COMMENT 'Nota final',
  `que_list_temp` varchar(150) DEFAULT NULL COMMENT 'lista de preguntas temporales',
  `exam_id` int(11) DEFAULT NULL COMMENT 'ID del examen',
  `que_list_saved` varchar(150) DEFAULT NULL COMMENT 'Lista desordenada de preguntas',
  PRIMARY KEY (`id`),
  KEY `FK_exam_user_user` (`user_id`),
  KEY `FK_exam_user_exam` (`exam_id`),
  CONSTRAINT `FK_exam_user_exam` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`),
  CONSTRAINT `FK_exam_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8 COMMENT='Son los datos del estudiantes';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.question
CREATE TABLE IF NOT EXISTS `question` (
  `que_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) DEFAULT NULL,
  `lev_id` int(11) DEFAULT NULL,
  `ty_id` int(11) DEFAULT NULL,
  `que_que` varchar(200) DEFAULT NULL,
  `que_1` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `que_2` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `que_3` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `que_4` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `que_true` int(11) DEFAULT NULL,
  `feedback` varchar(160) DEFAULT NULL,
  `que_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  `is_show` int(1) DEFAULT '1',
  PRIMARY KEY (`que_id`),
  KEY `FK_question_question_category` (`cat_id`),
  KEY `FK_question_question_type` (`ty_id`),
  KEY `FK_question_question_level` (`lev_id`),
  KEY `FK_question_user` (`user_id`),
  CONSTRAINT `FK_question_question_category` FOREIGN KEY (`cat_id`) REFERENCES `question_category` (`cat_id`),
  CONSTRAINT `FK_question_question_level` FOREIGN KEY (`lev_id`) REFERENCES `question_level` (`lev_id`),
  CONSTRAINT `FK_question_question_type` FOREIGN KEY (`ty_id`) REFERENCES `question_type` (`ty_id`),
  CONSTRAINT `FK_question_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.question_category
CREATE TABLE IF NOT EXISTS `question_category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_cat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_cat` (`cat_cat`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.question_level
CREATE TABLE IF NOT EXISTS `question_level` (
  `lev_id` int(11) NOT NULL AUTO_INCREMENT,
  `lev_lev` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`lev_id`),
  UNIQUE KEY `lev_lev` (`lev_lev`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.question_type
CREATE TABLE IF NOT EXISTS `question_type` (
  `ty_id` int(11) NOT NULL AUTO_INCREMENT,
  `ty_ty` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ty_id`),
  UNIQUE KEY `ty_ty` (`ty_ty`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_fullname` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_nick` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'Nickname',
  `user_is_male` int(11) DEFAULT NULL,
  `user_password` varchar(155) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_dni` int(11) NOT NULL DEFAULT '0',
  `user_email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_phone` varchar(50) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `user_faculty` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_nick` (`user_nick`),
  UNIQUE KEY `user_code` (`user_code`),
  KEY `FK_user_user_type` (`type_id`),
  KEY `FK_user_user_faculty` (`user_faculty`),
  CONSTRAINT `FK_user_user_faculty` FOREIGN KEY (`user_faculty`) REFERENCES `user_faculty` (`id`),
  CONSTRAINT `FK_user_user_type` FOREIGN KEY (`type_id`) REFERENCES `user_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5866 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.user_faculty
CREATE TABLE IF NOT EXISTS `user_faculty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `faculty` varchar(50) DEFAULT NULL COMMENT 'Nombre de facultad',
  PRIMARY KEY (`id`),
  UNIQUE KEY `faculty` (`faculty`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla b6hziqljw9smv3obfjhs.user_type
CREATE TABLE IF NOT EXISTS `user_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
