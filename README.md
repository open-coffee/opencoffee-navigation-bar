# Navigation Bar

## How to use

The navigation bar adds the navigation between the CoffeeNet Applications.

To use it you just need to add the maven dependency below and Bootstrap with jQuery and you are ready to go.
If you have already bootstrap in your project so just use that dependency.

### Maven

```
<dependency>
    <groupId>coffee.synyx</groupId>
    <artifactId>navigation-bar</artifactId>
    <version>${version}</version>
</dependency>
```

### Javascript

Just add the javascript dependency

```
<script src="/webjars/navigation-bar/bundle.js"></script>
```

or minimized

```
<script src="/webjars/navigation-bar/bundle.min.js"></script>
```

### Html

Now just add the simple html snipped listed below where you want to show the CoffeeNet header

```
<!-- CoffeeNet header -->
<header id="coffeenet-header"></header>
```

## Development

Only change the files based in the /navigation folder.

### Build

```
mvn clean install
```

This command will trigger 'npm install' that will trigger webpack to convert the es2015 javascript file into es5.
