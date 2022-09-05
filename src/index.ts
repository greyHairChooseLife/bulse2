import express, { Request, Response } from 'express';
import env from 'dotenv';
env.config();
import cors from 'cors';
import methodOverride from 'method-override';

import projectRouter from './routers/projectRouter';
import reservationRouter from './routers/reservationRouter';
//import adminRouter from './routers/adminRouter';

const app = express();

//	https://satisfactoryplace.tistory.com/368
//	프록시 사용자의 original ip를 가져오기 위한 설정. 무슨 크롬 확장 프로그램같은 프록시가 아니더라도 효율적인 서버 운영을 위한 프록시 기능을 마련하는 경우도 많으니까 기본적으로 해 주면 좋을 듯 하다.
app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '1mb'}));

app.use(cors()); 		//enble pre-flight
app.use(methodOverride('_method'));

//app.use('/admin', adminRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('this is bulse version.2 backend server home page!!');
});

app.use('/project', projectRouter);
app.use('/reservation', reservationRouter);

app.listen(process.env.PORT, () => {
	console.log(`
		!! server listening on port ${process.env.PORT} :  !!
		`);
});
