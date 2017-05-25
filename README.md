[![Build Status](https://travis-ci.org/coffeenet/coffeenet-navigation-bar.svg?branch=master)](https://travis-ci.org/coffeenet/coffeenet-navigation-bar)

# Navigation Bar

## How to use

The navigation bar adds the navigation between the CoffeeNet Applications.

To use it you just need to add the maven dependency below and Bootstrap with jQuery and you are ready to go.
If you have already bootstrap in your project so just use that dependency.

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
    <groupId>coffee.synyx</groupId>
    <artifactId>navigation-bar</artifactId>
    <version>${version}</version>
</dependency>
```

### Javascript

Just add the javascript dependency

```html
<script src="/webjars/navigation-bar/bundle.js"></script>
```

or minimized

```html
<script src="/webjars/navigation-bar/bundle.min.js"></script>
```

### Html

Now just add the simple html snipped listed below where you want to show the CoffeeNet header

```html
<!-- CoffeeNet header -->
<header id="coffeenet-header"></header>
```

## Development

Only change the files based in the /navigation folder.

### Build

```bash
./mvnw clean install
```

This command will trigger 'npm install' that will trigger webpack to convert the es2015 javascript file into es5.
