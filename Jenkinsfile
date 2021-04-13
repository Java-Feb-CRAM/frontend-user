#!groovy

void setBuildStatus(String message, String state) {
  step([
    $class            : "GitHubCommitStatusSetter",
    reposSource       : [$class: "ManuallyEnteredRepositorySource", url: env.GIT_URL],
    contextSource     : [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
    errorHandlers     : [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
    statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]]]
  ]);
}


pipeline {
  agent any
  tools {
    maven 'Maven 3.8.1'
  }
  stages {
    stage('Test') {
      steps {
        setBuildStatus("Build pending", "PENDING")
        echo 'Testing..'
        sh "npm install"
        sh "npm run test-headless"
      }
    }
    stage('Build') {
      steps {
        echo 'Building..'
        sh "ng build --prod"
      }
    }
    stage('Analysis') {
      steps {
        echo 'Analyzing..'
        withSonarQubeEnv('sonarQube') {
          sh "mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.7.0.1746:sonar"
        }
      }
    }
    stage("Quality Gate") {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying..'
        sh "aws s3 cp $WORKSPACE/dist/frontend-user s3://ut-frontend-user --recursive --include '*'"

      }
    }
  }
  post {
    always {
      cleanWs(cleanWhenNotBuilt: false,
        deleteDirs: true,
        disableDeferredWipeout: true,
        notFailBuild: true,
        patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                   [pattern: '.propsfile', type: 'EXCLUDE']])
    }
    success {
      setBuildStatus("Build succeeded", "SUCCESS")
    }
    failure {
      setBuildStatus("Build failed", "FAILURE")
    }
  }
}
