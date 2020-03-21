node('devops-aws') {
    stage('Clean up') {
        sh 'rm -rf *'
    }
    stage('Checkout Changes') {
        def changeBranch = "change-${GERRIT_CHANGE_NUMBER}-${GERRIT_PATCHSET_NUMBER}"
        def scmVars = checkout scm
        git url: scmVars.GIT_URL
        sh "git fetch origin ${GERRIT_REFSPEC}:${changeBranch}"
        sh "git checkout ${changeBranch}"
    }
    stage('Install Dependencies') {
        echo 'running npm install...'
        sh 'npm install'
    }
    stage('Audit Dependencies') {
        echo 'running npm audit...'
        sh 'npm audit'
    }
    stage('Lint Source Code') {
        echo 'running linter...'
        sh 'npm run lint-check'
    }
    stage('Run Tests') {
        echo 'running test...'
        echo 'disable testing for now because it requires an unpublished local project'
    }
    stage('Verify Build Process') {
        echo 'skipped verifying build because git project isn\'t available on GitHub yet.'
    }
}
