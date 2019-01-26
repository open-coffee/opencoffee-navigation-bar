[![Build Status](https://travis-ci.org/coffeenet/coffeenet-navigation-bar.svg?branch=master)](https://travis-ci.org/coffeenet/coffeenet-navigation-bar)

# Navigation Bar

## How to use

The navigation bar adds the navigation between the CoffeeNet
Applications.

To use it you just need to add the maven dependency below
and you are ready to go.

### Maven

#### Repository

```xml
<repositories>
  <repository>
    <id>releases.public.nexus.synyx.de</id>
    <url>http://nexus.synyx.de/content/repositories/public-releases</url>
  </repository>
</repositories>
```

#### Dependency

```xml
<dependency>
    <groupId>rocks.coffeenet</groupId>
    <artifactId>navigation-bar</artifactId>
    <version>${version}</version>
</dependency>
```

### Usage

Just add the html snipped listed below:

```html
<html>
<head>
    <!-- Your header stuff here -->
</head>

<body>
    <!-- CoffeeNet header -->
    <header id="coffeenet-header"></header>

    <!-- Your html here -->

    <script src="/webjars/navigation-bar/bundle.min.js"></script>
    <!-- Your scripts here -->
</body>
</html>
```

## Development

Only change the files based in the /navigation folder.

### Build

```bash
./mvnw clean install
```

This command will trigger 'npm install' that will trigger
webpack to convert the es2015 javascript file into es5.