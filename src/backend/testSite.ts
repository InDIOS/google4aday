import { Router } from 'express';

const testRouter = Router();

testRouter.get('/', (req, res) => {
	res.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document - Home</title>
	</head>
	<body>
		<nav>
			<a href="/test">Home</a>
			<a href="/test/other">Other page</a>
			<a href="/test/another">Another page</a>
			<a href="/test/something">Something page</a>
		</nav>
		<p>
			Lorem ipsum dolor, sit amet <span>consectetur</span> adipisicing elit. Suscipit corporis
			deleniti nostrum <strong>voluptatibus</strong> sed, nesciunt ratione temporibus dolor ullam dolorem vel,
			consequatur enim cupiditate sequi numquam! <em>Minus</em> porro quidem perspiciatis!
		</p>
	</body>
	</html>
	`);
});

testRouter.get('/other', (req, res) => {
	res.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document - Other</title>
	</head>
	<body>
		<nav>
			<a href="/test">Home</a>
			<a href="/test/other">Other page</a>
			<a href="/test/another">Another page</a>
			<a href="/test/something">Something page</a>
		</nav>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo animi natus neque
			voluptas, numquam atque nostrum reprehenderit in quam officia, alias nihil,
			fugiat perferendis dignissimos autem labore nesciunt dolor.
		</p>
	</body>
	</html>
	`);
});

testRouter.get('/another', (req, res) => {
	res.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document - Another</title>
	</head>
	<body>
		<nav>
			<a href="/test">Home</a>
			<a href="/test/other">Other page</a>
			<a href="/test/another">Another page</a>
			<a href="/test/something">Something page</a>
		</nav>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit.
			Commodi iure deleniti dicta in, ullam magnam nostrum reprehenderit, cumque ea,
			sapiente aliquam maiores itaque porro eum doloremque obcaecati distinctio hic quia.
		</p>
	</body>
	</html>
	`);
});

testRouter.get('/something', (req, res) => {
	res.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document - Something</title>
	</head>
	<body>
		<nav>
			<a href="/test">Home</a>
			<a href="/test/other">Other page</a>
			<a href="/test/another">Another page</a>
			<a href="/test/something/else">Something else page</a>
		</nav>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam quidem officiis, obcaecati
			repudiandae hic itaque quis nobis blanditiis voluptas, aperiam dolore explicabo?
			Dolorum dolore soluta nihil provident inventore quibusdam sit?
		</p>
	</body>
	</html>
	`);
});

testRouter.get('/something/else', (req, res) => {
	res.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Document - Something else</title>
	</head>
	<body>
		<nav>
			<a href="/test">Home</a>
			<a href="/test/other">Other page</a>
			<a href="/test/another">Another page</a>
			<a href="/test/something">Something page</a>
		</nav>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam rerum asperiores, reiciendis
			tenetur nulla temporibus molestiae hic ab! Autem illum facere temporibus saepe
			maxime consequuntur dicta blanditiis eveniet. Magnam, maiores?
		</p>
	</body>
	</html>
	`);
});

export default testRouter;
