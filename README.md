# Pathing Maze

A full stack angularJS project that can solve a text based maze. It accepts the raw maze and submits it to the backend that parses through and provides a solution that the dom then renders with the shortest path and the number of steps required to reach the end.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

After pulling from github, install the files with npm 
```
npm install
```
This will take care of dependencies and allow you to get the project running by using the start command
```
npm start
```
The project will run on localhost 5000. You can then submit the following maze to test the project and solving algorithm
```
##########
#A...#...#
#.#.##.#.#
#.#.##.#.#
#.#....#B#
#.#.##.#.#
#....#...#
##########
```

## Running the tests

There is currently one basic Mocha test. It runs a simplified test maze against just the builder function bypassing the front end. I makes sure that a result is returned with the correct number of steps in the solution path and checks each other component to make sure they are not empty.

```
npm test
```


## Built With

* [Angular 1.x](https://angularjs.org) - Single Page App Framework
* [NodeJS](https://nodejs.org)
* [Express](https://expressjs.com)
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds


## Authors

* **Kevin McMahon** - *Initial work* - [Polygeekism](https://github.com/Polygeekism)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

