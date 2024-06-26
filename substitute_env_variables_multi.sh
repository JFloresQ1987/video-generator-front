#!/bin/bash

# State all variables which should be included here
variables=(
  API_URL
  SUPABASE_URL
  SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  RECAPTCHA_V3_STACKBLITZ_KEY
  RECAPTCHA_V2_DUMMY_KEY
)
# variables=( TEST_ENV )

# The first parameter has to be the path to the directory or file which should be used for the substitution
if [[ -z $1 ]]; then
    echo 'ERROR: No target file or directory given.'
    exit 1
fi

for i in "${variables[@]}"
do
  # Error if variable is not defined
  if [[ -z ${!i} ]]; then
    echo 'ERROR: Variable "'$i'" not defined.'
    exit 1
  fi

  # Escape special characters, for URLs
  replaceString=$(echo ${!i} | sed -e 's/[\/&]/\\&/g')

  # Get all files including the environment variable (and ending with '.html') substitute the placeholder with its content
  if [ "$DEBUG" = true ]
  then
    # If DEBUG=true in order to log the replaced files
    grep -rl --include \*.html "$i" "$1" | xargs sed -i "s/\${""$i""}/$replaceString/Ig;w /dev/stdout"
  else
    # If DEBUG=false do it without logging
    grep -rl --include \*.html "$i" "$1" | xargs sed -i "s/\${""$i""}/$replaceString/Ig"
  fi
done

# Execute all other parameters
exec "${@:2}"
