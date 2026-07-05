# set up the nod eapplication

# npm i eslint @eslint/js prettier eslint-config-prettier eslint-plugin-prettier -D => for setting up EsLint Prettier

# add 3 files; eslint.config.js, .prettierrc, .prettierignore

# after that setup neon Database -> create account and get connection string and also install in project:
# 1 -> npm i @neondatabase/serverless drizzle-orm (installing both to keep our database queries type safe)
# 2 -> npm i -D drizzle-kit (install a dev dependency)

# Now create a new file in root folder -> drizzle.config.js -> (we will write database configurations in it)
# then add a database.js in config folder
# add script in the package.json; 3 scripts -> generate, migrate, studio
# then create first shema of the application -> User schema

# now after creating users table, the way it works in postgress databases and drizzle is that now we have to generate sql schemas using drizzle -> "npm run db:generate" (we will get new sql migration file right under the drizzle folder)
# after that we have migrate and push changes to neon database -> "npm run db:migrate"

# for logging we are going to use super popular library "winstonjs" that has over 24000 stars on github; and it can log about anything (info, errors, debugging and more)
# install it -> npm i winston
# after installing winston now create a file "logger.js" in config folder and set up the winston configurations

# set the absolute paths for files -> write imports in package.json file for all the folders
# install these as well -> npm i morgan helmet cors cookie-parser

# after updating package.json file, and installing all the packages; now update the app.js file (import all the middlewares)

