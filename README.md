# RD72 Bot
Discord Bot for the best league in the universe

## How to install and run the bot on server

- create empty directory where the files will be cloned:
`mkdir /var/www/rd72bot`

- init bare repo somewhere else:
`git init --bare ~/rd72-bot.git`

- create/edit the `post-receive` hook:
`nano ~/rd72-bot.git/hooks/post-receive`

```
#!/bin/bash
TARGET="/var/www/rd72bot"
GIT_DIR="/home/ubuntu/rd72-bot.git"
BRANCH="master"

while read oldrev newrev ref
do
        # only checking out the master (or whatever branch you would like to deploy)
        if [ "$ref" = "refs/heads/$BRANCH" ];
        then
                echo "Ref $ref received. Deploying ${BRANCH} branch to production..."
                git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH
                cd $TARGET && npm install
                # pm2 restart RD72_Bot
        else
                echo "Ref $ref received. Doing nothing: only the ${BRANCH} branch may be deployed on this server."
        fi
done
```

- add new remote on local repo:
`git remote add production USER@IP:rd72-bot.git`

- push some changes to new remote to trigger the `post-receive` hook on server:
`git push production`

- if needed, create the `.env` file in the cloned directory

- start a new named task with PM2:
`pm2 start /var/www/rd72-bot/index.js --name "RD72_Bot"`

- check that process is running along with others if applicable:
`pm2 list`

- save PM2 processes:
`pm2 save`

- uncomment line 14 in the `post-receive` hook to automatically restart the process when changes are pushed

