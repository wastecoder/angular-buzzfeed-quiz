import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quiz_questions from '../../../assets/data/quizz_questions.json';
import { Quiz, Question } from '../quiz/models/quiz.model';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: Question[] = [];
  currentQuestion!: Question;

  selectedAnswers: string[] = [];
  finalResultText: string = '';

  currentIndex: number = 0;
  totalQuestions: number = 0;
  finished: boolean = false;

  private quizData!: Quiz;

  constructor() {}

  ngOnInit(): void {
    this.quizData = quiz_questions as Quiz;

    this.title = this.quizData.title;
    this.questions = this.quizData.questions;
    this.totalQuestions = this.questions.length;
    this.currentQuestion = this.questions[this.currentIndex];
    this.finished = false;
  }

  playerChoose(alias: string): void {
    this.selectedAnswers.push(alias);
    this.nextStep();
  }

  nextStep(): void {
    this.currentIndex++;

    if (this.currentIndex < this.totalQuestions) {
      this.currentQuestion = this.questions[this.currentIndex];
    } else {
      const finalAlias = this.checkResult(this.selectedAnswers);
      this.finished = true;
      this.finalResultText = this.quizData.results[finalAlias];
    }
  }

  checkResult(answers: string[]): string {
    const count: Record<string, number> = {};

    answers.forEach((alias) => {
      count[alias] = (count[alias] || 0) + 1;
    });

    return Object.entries(count).reduce((a, b) => (a[1] >= b[1] ? a : b))[0];
  }
}
